import { NextRequest, NextResponse } from 'next/server';

interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  salesPrice: string;
  employmentType: string;
  employmentDuration: string;
  salary: string;
  creditScore: string;
  downPayment: string;
  timeline: string;
}

// Map timeline values to readable format
const timelineMap: Record<string, string> = {
  'immediate': 'Immediate – Need funding ASAP',
  '30-days': 'Within 30 days',
  '30-60-days': '30-60 days',
  '60-plus': '60+ days',
  'just-looking': 'Just looking / exploring options',
};

// Map employment values to readable format
const employmentMap: Record<string, string> = {
  'salaried': 'Salaried / W-2 Employee',
  'self-employed': 'Self-Employed / Business Owner',
  '1099': '1099 Contractor',
  'retired': 'Retired',
  'other': 'Other',
};

// Map credit score values to readable format
const creditScoreMap: Record<string, string> = {
  'excellent': 'Excellent (750+)',
  'good': 'Good (700-749)',
  'fair': 'Fair (650-699)',
  'poor': 'Below 650',
  'not-sure': 'Not sure',
};

// Parse sales price to get loan amount estimate
function parseSalesPrice(priceRange: string): number | undefined {
  const priceMap: Record<string, number> = {
    'Under $200,000': 180000,
    '$200,000 - $350,000': 275000,
    '$350,000 - $500,000': 425000,
    '$500,000 - $750,000': 625000,
    '$750,000 - $1,000,000': 875000,
    '$1,000,000+': 1200000,
  };
  return priceMap[priceRange];
}

// Format phone to E.164 format
function formatPhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  return `+${digits}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData: LeadFormData = await request.json();

    // Validate required fields
    if (!formData.phone || !formData.fullName || !formData.email) {
      return NextResponse.json(
        { error: 'Missing required fields', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    // Split full name into first and last
    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Build the LoanDock API payload
    const loandockPayload = {
      phone: formatPhoneE164(formData.phone),
      first_name: firstName,
      last_name: lastName,
      email: formData.email,
      loan_amount: parseSalesPrice(formData.salesPrice),
      loan_purpose: 'purchase',
      custom_fields: [
        { question: 'City/Area Interested', answer: formData.city },
        { question: 'Approximate Sales Price', answer: formData.salesPrice },
        { question: 'Employment Type', answer: employmentMap[formData.employmentType] || formData.employmentType },
        { question: 'Employment Duration', answer: formData.employmentDuration },
        { question: 'Annual Income', answer: formData.salary },
        { question: 'Credit Score', answer: creditScoreMap[formData.creditScore] || formData.creditScore },
        { question: 'Down Payment Available', answer: formData.downPayment },
        { question: 'Timeline', answer: timelineMap[formData.timeline] || formData.timeline },
      ],
      metadata: {
        form_id: 'mortgage-fellas-get-started',
        landing_page: 'mortgagefellas.com',
        source: 'website',
      },
    };

    // Get API key from environment variable
    const apiKey = process.env.LOANDOCK_API_KEY;

    if (!apiKey) {
      console.error('LOANDOCK_API_KEY not configured');
      // Still return success to user but log error
      return NextResponse.json(
        { success: true, message: 'Lead received (API key not configured)' },
        { status: 200 }
      );
    }

    // Submit to LoanDock CRM
    const response = await fetch('https://crm.loandock.com/api/public/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(loandockPayload),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('Lead submitted to LoanDock:', result.lead_id);
      return NextResponse.json({
        success: true,
        lead_id: result.lead_id,
        message: 'Lead created successfully',
      });
    } else {
      console.error('LoanDock API error:', result);
      
      // Handle duplicate lead gracefully
      if (result.code === 'DUPLICATE_LEAD') {
        return NextResponse.json({
          success: true,
          message: 'Thank you! We already have your information on file.',
        });
      }

      return NextResponse.json(
        { error: result.error || 'Failed to submit lead', code: result.code },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      { error: 'Internal server error', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}

