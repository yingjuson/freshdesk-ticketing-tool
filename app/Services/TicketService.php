<?php

namespace App\Services;

use App\Models\Ticket;

class TicketService
{
    const IGNORED_KEYS = [
        'status',
        'subject',
        'attachments',
        'issue_details',
        'new_attachments',
        'existing_attachments'
    ];

    /**
     * combines all input data except IGNORED_KEYS to
     * generate a formatted description for Freshdesk
     */
    public function formatDescription(array $payload)
    {
        $description = '';

        foreach ($payload as $key => $value) {
            if (!in_array($key, self::IGNORED_KEYS) && !!$value) {
                $new_value = $value;
                $new_key = ucwords(str_replace('_', ' ', $key));

                if ($key == 'concern_type') {
                    $new_value = ucwords(str_replace('_', ' ', $value));
                }

                $description .= '<b>' . $new_key . '</b>: ' . $new_value . "<br />";
            }
        }

        $description .= "<br /><br />---- Additional Details ----<br /><br />" . $payload['issue_details'];

        return $description;
    }

    /**
     * formats data to multipart data
     */
    public function buildMultipartData(array $data)
    {
        $multipart = [];

        foreach ($data as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $item) {
                    $multipart[] = [
                        'name' => $key . '[]',
                        'contents' => $item['file'],
                        'filename' => $item['file_name']
                    ];
                }
            } else {
                $multipart[] = [
                    'name' => $key,
                    'contents' => $value
                ];
            }
        }

        return $multipart;
    }
}
