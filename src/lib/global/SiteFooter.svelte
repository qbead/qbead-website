<script lang="ts">
  import IconInstagram from '@lucide/svelte/icons/instagram'
  import IconLinkedin from '@lucide/svelte/icons/linkedin'
  import IconTwitter from '@lucide/svelte/icons/twitter'
  import IconGithub from '@lucide/svelte/icons/github'
  import IconMail from '@lucide/svelte/icons/mail'
  import IconYoutube from '@lucide/svelte/icons/youtube'
  import IconTwitch from '@lucide/svelte/icons/twitch'
  import IconFacebook from '@lucide/svelte/icons/facebook'
  import type { Icon as IconType } from '@lucide/svelte'

  const icons: Record<string, typeof IconType> = {
    instagram: IconInstagram,
    linkedin: IconLinkedin,
    twitter: IconTwitter,
    github: IconGithub,
    mail: IconMail,
    youtube: IconYoutube,
    twitch: IconTwitch,
    facebook: IconFacebook,
  }

  // Edit this to define social icon links
  const socialLinks = [
    {
      icon: 'github',
      href: 'https://github.com/qbead/',
      label: 'GitHub',
    },
  ]
</script>

<footer class="bg-surface-100-900 flex flex-col gap-16 px-10 py-12 md:pt-24">
  <div class="mx-auto w-full max-w-7xl">
    <nav class="grid grid-cols-1 gap-20 text-center md:grid-cols-4 md:text-left">
      <div class="flex flex-col items-center gap-6 md:items-start">
        <img src="/Qbead-Logo-Dark-Mode-White-Rgb.svg" alt="Qbead Logo" width="136" />
        <ul class="flex gap-6">
          {#each socialLinks as { icon, href, label }}
            <li>
              <a
                {href}
                target="_blank"
                rel="noopener noreferrer"
                class="text-on-surface-variant-900 hover:text-primary-500"
                aria-label={label}
              >
                {#if icon in icons}
                  {@const IconComponent = icons[icon]}
                  <IconComponent size={32} />
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div class="flex flex-col">
        <h3 class="h4 text-on-surface-variant-900 mb-5 font-semibold">Resources</h3>
        <ul class="flex flex-col gap-3 text-xl">
          <li><a href="/lessons" class="hover:underline">Lessons</a></li>
          <li><a href="/codedoc" class="hover:underline">Code Documentation</a></li>
          <li><a href="/team" class="hover:underline">Team</a></li>
        </ul>
      </div>

      <div class="flex flex-col">
        <h3 class="h4 text-on-surface-variant-900 mb-5 font-semibold">Contact</h3>
        <ul class="flex flex-col gap-3 text-xl">
          <li>
            <a
              href="mailto:info@qbead.org"
              class="flex items-center justify-center gap-3 hover:underline md:justify-start"
            >
              <IconMail />
              <span>info@qbead.org</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="flex flex-col">
        <h3 class="h4 text-on-surface-variant-900 mb-5 font-semibold">Sponsored by</h3>
        <a href="https://quantumdelta.nl/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center md:justify-start">
          <img src="/sponsor/QDNL-logo-L-neg-RGB.png" width="80">
        </a>
      </div>
    </nav>
    <div class="text-on-surface-variant-900 border-surface-200-800 mt-16 border-t pt-10">
      &copy; {new Date().getFullYear()} Qbead Project. All rights reserved.
    </div>
  </div>
</footer>
