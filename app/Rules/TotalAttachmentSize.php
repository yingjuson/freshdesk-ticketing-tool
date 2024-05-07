<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TotalAttachmentSize implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $maxSizeInBytes = 20 * 1024 * 1024; // 20 MB
        $totalSize = 0;


        forEach($value as $file) {
            $totalSize += $file->getSize();
        }

        if ($totalSize > $maxSizeInBytes) {
            $fail('The :attribute total size exceeds 20MB.');
        }
    }
}
