<?php

namespace App\Policies;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policies\Basic;

class CustomCSP extends Basic
{
    public function configure()
    {
        parent::configure();
        
        $this->addDirective(Directive::DEFAULT, [Keyword::SELF, Keyword::UNSAFE_INLINE, 'http:', 'https:', 'ws:', 'wss:', 'blob:'])
        // $this->addDirective(Directive::DEFAULT, [Keyword::SELF, 'http:', 'https:', 'ws:', 'wss:', 'blob:'])
            ->addDirective(Directive::STYLE, [Keyword::SELF, 'https://fonts.bunny.net']);
    }
}