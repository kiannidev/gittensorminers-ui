import { Github, Heart, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gt-border bg-gt-surface/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold text-gt-text">
            kiannidev&apos;s production
            <Heart className="ml-1.5 inline h-3.5 w-3.5 fill-rose-500 text-rose-500" />
          </p>
          <p className="mt-1 text-xs text-gt-muted">© 2026 Gittensor Miners. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a
            href="https://t.me/mmacatt"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gt-muted transition hover:text-sky-400"
          >
            <Send className="h-4 w-4" />
            <span>
              Telegram <span className="text-gt-text">@mmacatt</span>
              <span className="text-gt-muted"> (macat)</span>
            </span>
          </a>
          <a
            href="https://github.com/kiannidev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gt-muted transition hover:text-gt-text"
          >
            <Github className="h-4 w-4" />
            <span>GitHub @kiannidev</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
