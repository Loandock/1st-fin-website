import { NextRequest, NextResponse } from 'next/server';

interface MyPlanFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  goal: string;
  notes: string;
  smsConsent: boolean;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  fbclid: string | null;
}

function formatPhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData: MyPlanFormData = await request.json();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      return NextResponse.json(
        { error: 'Missing required fields', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    const utmFields = [];
    if (formData.utmSource) utmFields.push({ question: 'UTM Source', answer: formData.utmSource });
    if (formData.utmMedium) utmFields.push({ question: 'UTM Medium', answer: formData.utmMedium });
    if (formData.utmCampaign) utmFields.push({ question: 'UTM Campaign', answer: formData.utmCampaign });
    if (formData.utmContent) utmFields.push({ question: 'UTM Content', answer: formData.utmContent });
    if (formData.utmTerm) utmFields.push({ question: 'UTM Term', answer: formData.utmTerm });
    if (formData.fbclid) utmFields.push({ question: 'Facebook Click ID', answer: formData.fbclid });

    const loandockPayload = {
      phone: formatPhoneE164(formData.phone),
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      email: formData.email.trim(),
      loan_purpose: 'purchase',
      custom_fields: [
        { question: 'City/Area Interested', answer: formData.city || '' },
        { question: 'Goal', answer: formData.goal },
        { question: 'Additional Notes', answer: formData.notes || '' },
        { question: 'SMS Consent', answer: formData.smsConsent ? 'Yes' : 'No' },
        ...utmFields,
      ],
      metadata: {
        form_id: 'mortgage-fellas-meta-myplan',
        landing_page: 'mortgagefellas.com/myplan',
        source: 'meta-ad',
      },
    };

    const apiKey = process.env.LOANDOCK_API_KEY;

    if (!apiKey) {
      console.error('LOANDOCK_API_KEY not configured');
      return NextResponse.json(
        { success: true, message: 'Lead received (API key not configured)' },
        { status: 200 }
      );
    }

    const response = await fetch('https://crm.loandock.com/api/public/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(loandockPayload),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('MyPlan lead submitted to LoanDock:', result.lead_id);
      return NextResponse.json({ success: true, lead_id: result.lead_id, message: 'Lead created successfully' });
    } else {
      console.error('LoanDock API error:', result);
      if (result.code === 'DUPLICATE_LEAD') {
        return NextResponse.json({ success: true, message: 'Thank you! We already have your information on file.' });
      }
      return NextResponse.json(
        { error: result.error || 'Failed to submit lead', code: result.code },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error submitting myplan lead:', error);
    return NextResponse.json({ error: 'Internal server error', code: 'SERVER_ERROR' }, { status: 500 });
  }
}
