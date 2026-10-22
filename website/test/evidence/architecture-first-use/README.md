# Architecture case to first use

Base: `ba701d20a55ed6f139484d9ead7ff45671fe40eb` (main, 2026-10-19).
Initial candidate: `d2e4aa880dd72dfcf6e283cdc2e3d69900845aac`. Initial checks below ran on its complete working diff before commit. Follow-up evidence is recorded at the end.

## Observed before

The homepage navigation's Install Skill anchor resolved to `#quickstart`, although Start already supports agent and install-scope selection. The architecture type panel linked only to the general gallery. The existing MCO case had pinned evidence and limits but no replay command or direct repository-mode installation action. These are inspection findings, not measured conversion failures.

## Changed experience

- Homepage Install Skill opens localized Start at `#install`.
- The architecture type panel links to the existing localized MCO case.
- The case provides the original HTML and JSON, a replay pinned to both repositories, an adaptation prompt, boundaries and repository-mode Start.
- Original artifact/source bytes and all generation behavior remain unchanged.

## Initial checks executed by Codex

- `npm --prefix website run check`: 0 errors, 0 warnings, one existing clipboard deprecation hint.
- Default build: 14 pages. `npm --prefix website test`: 79 passed, 7 browser tests skipped by their opt-in conditions, 0 failed.
- Cloudflare build: 14 pages. `ARCHIFY_SITE_TARGET=cloudflare node --test website/test/mco-source-case.test.mjs website/test/seo-content.test.mjs website/test/deployment-target.test.mjs`: 18 passed.
- Existing homepage and MCO real Chrome browser suites: 2 passed, 0 skipped on each host build. Covers English/Chinese, light/dark, widths 1440/390/320, text bounds, section navigation, language continuity, gallery links and artifact load.
- Replay command ran successfully using this Archify base and the existing local MCO checkout containing `9f1a1cf1afdc04d7b5406782b40dfec76d9bc798`, passed as `--repo-root`. It produced `/tmp/archify-mco-replay.html`. The initial probe without `--repo-root` failed as designed; the documented commands now include cloning and pinning that repository. The full network clone commands were not repeated for the replay.
- Ego keyboard checks: focus homepage Install Skill and Enter → `/archify/start.html#install`; focus Chinese homepage MCO link and Enter → `/archify/zh/cases/mco-runtime.html`; case repository-mode action and Enter → Start preserving `type=architecture&input=repository#install`. No installation was executed.
- `git diff --check`: passed.

## Visual evidence

Browser-suite screenshots, inspected by Codex (not human acceptance):

- [Desktop replay, English light, 1440×1000](desktop-replay.png)
- [Mobile replay, Chinese light, 390×1000](mobile-zh-replay.png)
- [Mobile adaptation prompt, English dark, 320×1000](mobile-en-prompt.png)

Screenshots are bounded page tiles; their top may continue a preceding tile. Text remains readable and within the viewport. Full local browser manifests and tiles are in ignored `website/.browser-evidence/{github,cloudflare}/`.

No new tracking was added. Existing Start session events were unchanged. This PR establishes usable links and content, not SEO ranking, traffic growth or installation conversion improvements. Live production acceptance awaits an authorized merge and deployment.


## Review follow-up

Comparison base: `d2e4aa880dd72dfcf6e283cdc2e3d69900845aac`. Candidate: the follow-up commit containing this update.

The bilingual repository prompt now requests an actual entry-to-output path, uses the provider-to-retained-files path only when present, and otherwise selects a path supported by the repository's code. Source links, pinned commit, explicit unknowns and artifact/check deliverables remain required. This avoids assuming MCO's components exist in another repository.

The existing navigation suite now checks the architecture-panel case link in both homepage locales, resolves it using the deployed HTML base, and verifies that its localized target was actually built. It runs against both deployment outputs. This protects a missing, wrong-locale or broken case destination without freezing the link's copy or markup structure.

Updated checks on the complete follow-up source/test diff:

- Type check: 0 errors/warnings, one existing clipboard deprecation hint.
- Default and Cloudflare builds: 14 pages each.
- Default website tests: 80 passed, 7 opt-in browser checks skipped, 0 failed.
- Cloudflare navigation/case/SEO/deployment tests: 21 passed, 0 skipped/failed.
- Real Chrome homepage and MCO suites on each build: 2 passed per build, 0 skipped/failed; same language/theme/viewport coverage as above.
- A temporary broken-link probe in ignored build output failed the new homepage test as expected; restoring the original output passed. No source file was altered by this probe.
- The linked screenshots were refreshed from the follow-up browser runs and inspected by Codex. This remains Agent visual inspection, not human acceptance.

No original artifact or product behavior changed. The original replay execution evidence remains applicable; no generation code, input JSON or command changed in this follow-up. Review discussion was not replied to or resolved as part of preparing this revision.
