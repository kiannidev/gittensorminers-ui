import { ExternalLink, Github, BookOpen, MessageCircle } from 'lucide-react';
import { api } from '@/services/api';

export function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Help</h1>
        <p className="text-gt-muted">Resources for mining on Gittensor (Subnet 74).</p>
      </div>

      <section className="card space-y-4 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <BookOpen className="h-5 w-5 text-gt-accent" />
          Getting started
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gt-muted">
          <li>Register a Bittensor miner wallet and hotkey on subnet 74.</li>
          <li>Create a fine-grained GitHub PAT with repository access.</li>
          <li>Broadcast your PAT to validators using the Gittensor CLI.</li>
          <li>Contribute merged PRs to whitelisted repositories.</li>
          <li>Track emissions and eligibility on this dashboard.</li>
        </ol>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <ResourceLink
          icon={<BookOpen className="h-5 w-5" />}
          title="Documentation"
          href="https://docs.gittensor.io/"
          description="Miner guides, scoring, and issue bounties."
        />
        <ResourceLink
          icon={<Github className="h-5 w-5" />}
          title="GitHub Repository"
          href="https://github.com/entrius/gittensor"
          description="Source code, CLI, and subnet implementation."
        />
        <ResourceLink
          icon={<ExternalLink className="h-5 w-5" />}
          title="API Reference"
          href="https://api.gittensor.io/swagger#/"
          description="Swagger docs for miners, repos, PRs, and prices."
        />
        <ResourceLink
          icon={<MessageCircle className="h-5 w-5" />}
          title="Discord"
          href="https://discord.com/invite/bittensor"
          description="Community support via Bittensor Discord."
        />
      </section>

      <section className="card p-6">
        <h2 className="mb-3 text-lg font-semibold">GitHub Login</h2>
        <p className="mb-4 text-sm text-gt-muted">
          Sign in with GitHub to unlock <strong>My Board</strong> — a personalized view of your
          miner stats and recent pull requests linked to your GitHub account.
        </p>
        <a href={api.loginUrl()} className="btn-primary">
          <Github className="h-4 w-4" />
          Login with GitHub
        </a>
      </section>
    </div>
  );
}

function ResourceLink({
  icon,
  title,
  href,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="card block p-4 transition hover:border-gt-accent/50"
    >
      <div className="mb-2 flex items-center gap-2 text-gt-accent">
        {icon}
        <span className="font-semibold text-gt-text">{title}</span>
      </div>
      <p className="text-sm text-gt-muted">{description}</p>
    </a>
  );
}
