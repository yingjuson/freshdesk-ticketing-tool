<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateTicketRequest extends FormRequest
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
            
            'webtool_role.required' => 'Role is required',
            'issue_details.required' => 'This field is required',
            'msisdn.required' => 'This field is required if Partner reference no. and Transaction ID are empty',
            'transaction_id.required' => 'This field is required if Partner reference no. and Transaction ID are empty',
            'partner_ref_number.required' => 'This field is required if Partner reference no. and Transaction ID are empty',

            'gpo_mobile_number.required' => 'GPO mobile number is required',
            'transaction_datetime.required' => 'Transaction date and time is required',

            'gpo_id.required_if' => 'GPO ID is required',
            'biller_ref_number.required_if' => 'Biller reference number is required',
            'gpadala_ref_number.required_if' => 'GPadala reference number is required',
            'transaction_datetime.required_if' => 'Transaction date and time is required',
            'customer_mobile_number.required_if' => 'Affected customer mobile number is required',

            // 'msisdn.required_without_all' => 'This field is required if Partner reference no. and Transaction ID are empty',
            // 'transaction_id.required_without_all' => 'This field is required if Partner reference no. and MSISDN are empty',
            // 'partner_ref_number.required_without_all' => 'This field is required if Transaction ID and MSISDN are empty',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $customer_mobtel_required = [
            'cash_in_via_mobtel',
            'cash_in_via_code',
            'pa_konsulta',
            'send_load',
            'cash_out',
        ];

        $non_service_related_concerns = [
            // GPO onboarding
            'suspended_gpo',
            'returned_application',
            'partially_approved_gpo',
            // GPO connection
            'displays_signup_page',
            'stuck_in_loading_screen',
            'cannot_view_gpo_logbook',
            'cannot_view_gpo_wallet_balance'
        ];

        $gpo_app_related = [
            ...$non_service_related_concerns,
            'gpo_app_service'
        ];

        $reports_related_concerns = [
            'inaccessible_report',
            'gpo_service_variance',
            'additional_recipient',
        ];

        $portal_type_with_role = [
            'csx_portal',
            'finance_portal',
            'distributor_portal'
        ];

        return [
            'concern_type'              => ['string', 'required'],
            'service_type'              => ['string', 'required_if:concern_type,gpo_app_service', 'nullable'],
            'subject'                   => ['required', 'string'],
            'issue_details'             => ['required', 'string'],
            'customer_mobile_number'    => ['string', Rule::requiredIf(request()->get('concern_type') == 'gpo_app_service' && in_array(request()->get('service_type'), $customer_mobtel_required)), 'nullable'],
            'gpo_mobile_number'         => ['string', Rule::requiredIf(in_array(request()->get('concern_type'), [...$gpo_app_related, 'gpo_service_variance'])), 'nullable'],
            'device_model'              => ['string', Rule::requiredIf(in_array(request()->get('concern_type'), $gpo_app_related)), 'nullable'],
            'device_os_version'         => ['string', Rule::requiredIf(in_array(request()->get('concern_type'), $gpo_app_related)), 'nullable'],
            'device_type'               => ['string', 'required_if:concern_type,gpo_app_service', 'in:ios,android', 'nullable'],
            'biller_name'               => ['string', 'required_if:service_type,bills_pay', 'nullable'],
            'biller_ref_number'         => ['string', 'required_if:service_type,bills_pay', 'nullable'],
            'gpadala_ref_number'        => ['string', 'required_if:service_type,claim_padala', 'nullable'],
            'transaction_amount'        => ['numeric', Rule::requiredIf(in_array(request()->get('concern_type'), ['gpo_app_service', 'gpo_service_variance'])), 'nullable'],
            'transaction_datetime'      => ['date_format:Y-m-d H:i', Rule::requiredIf(in_array(request()->get('concern_type'), [...$non_service_related_concerns, 'gpo_app_service', 'gpo_service_variance'])), 'nullable'],

            'portal_type'               => ['string', 'required_if:concern_type,webtool', 'nullable'],
            'webtool_role'              => ['string', Rule::requiredIf(request()->get('concern_type') == 'webtool' && in_array(request()->get('portal_type'), $portal_type_with_role)), 'nullable'],

            'report_type'               => ['string', Rule::requiredIf(in_array(request()->get('concern_type'), $reports_related_concerns)), 'nullable'],
            'report_date'               => ['string', Rule::requiredIf(in_array(request()->get('concern_type'), $reports_related_concerns) && request()->get('concern_type') !== 'additional_recipient'), 'nullable'],
            'gpo_id'                    => ['required_if:concern_type,gpo_service_variance', 'string', 'nullable'],

            'transaction_id'            => [Rule::requiredIf(request()->get('concern_type') == 'gpo_service_variance' && !request()->get('partner_ref_number') && !request()->get('msisdn')), 'string', 'nullable'],
            'partner_ref_number'        => [Rule::requiredIf(request()->get('concern_type') == 'gpo_service_variance' && !request()->get('transaction_id') && !request()->get('msisdn')), 'string', 'nullable'],
            'msisdn'                    => [Rule::requiredIf(request()->get('concern_type') == 'gpo_service_variance' && !request()->get('transaction_id') && !request()->get('partner_ref_number')), 'string', 'nullable'],

            'attachments.*'             => [File::types(['png', 'jpg', 'jpeg', 'pdf', 'mp4']), 'nullable']
        ];
    }
}
