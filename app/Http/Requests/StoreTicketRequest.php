<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // always authorize for now. apply permissions later on
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'required' => ':Attribute is required',
            'required_if' => ':Attribute is required',
            'biller_ref_number.required_if' => 'Biller reference number is required',
            'gpadala_ref_number.required_if' => 'GPadala reference number is required',
            'transaction_datetime.required_if' => 'Transaction date and time is required',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'concern_type'              => ['string', 'required', 'in:gpo_app,reports,webtool'],
            'service_type'              => ['string', Rule::requiredIf(request()->get('concern_type') === 'gpo_app' && !request()->get('other_service')), 'nullable'],
            'other_service'             => ['string', Rule::requiredIf(request()->get('concern_type') === 'gpo_app' && !request()->get('service_type')), 'nullable'],
            'issue_details'             => ['required', 'string'],
            'customer_mobile_number'    => ['string', 'nullable'],
            'gpo_mobile_number'         => ['string', 'required_if:concern_type,gpo_app', 'nullable'],
            'device_type'               => ['string', 'required_if:concern_type,gpo_app', 'in:ios,android', 'nullable'],
            'biller_name'                    => ['string', 'required_if:service_type,bills_pay', 'nullable'],
            'biller_ref_number'         => ['string', 'required_if:service_type,bills_pay', 'nullable'],
            'gpadala_ref_number'        => ['string', 'required_if:service_type,claim_padala', 'nullable'],
            'transaction_amount'        => ['numeric', Rule::requiredIf(request()->get('concern_type') === 'gpo_app' && !!request()->get('service_type')), 'nullable'],
            'transaction_datetime'      => ['required_if:concern_type,gpo_app', 'date_format:Y-m-d H:i', 'nullable'],

            'portal_type'               => ['string', 'required_if:concern_type,webtool', 'nullable'],
            'role'                      => ['string', 'nullable'],

            'report_type'               => ['string', 'required_if:concern_type,reports', 'nullable'],
            'email_subject'             => ['string', 'required_if:concern_type,reports', 'nullable'],
            'report_date'               => ['string', 'required_if:concern_type,reports', 'nullable'],
            'gpo_id'                    => ['string', 'nullable'],
            'transaction_id'            => ['string', 'nullable'],
            'partner_ref_number'        => ['string', 'nullable'],
            'msisdn'                    => ['string', 'nullable']
        ];
    }
}
