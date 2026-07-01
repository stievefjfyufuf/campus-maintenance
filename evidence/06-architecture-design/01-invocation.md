# Evidence 01 — Invocation

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 06 - Architecture Design |
| Tipe | Skill invocation record |
| Tanggal | 1 Juli 2026 |
| Skill | `06-se-architecture-design` |
| Agent | Antigravity (Google DeepMind) |
| Conversation ID | 7485d701-fb37-4843-be92-17daa7118683 |

## Trigger

Pengguna meminta kelanjutan proyek Campus Maintenance dari repository
`https://github.com/stievefjfyufuf/campus-maintenance` dengan instruksi eksplisit:

> "Kerjakan hanya Step 6 — Architecture Design."

Baseline commit yang digunakan: `129b6fa` (docs: finalize step 1 to 5 quality checks).

## Inputs Used

| Input | Source | Status |
|---|---|---|
| `docs/software-engineering/01-inception.md` | Repository baseline | Read |
| `docs/software-engineering/02-elicitation.md` | Repository baseline | Read |
| `docs/software-engineering/03-specification.md` | Repository baseline | Read |
| `docs/software-engineering/04-prioritization.md` | Repository baseline | Read |
| `docs/software-engineering/05-validation-change.md` | Repository baseline | Read |
| `docs/software-engineering/16-change-request.md` | Repository baseline | Read |
| `docs/software-engineering/changes/CR-001.md` | Repository baseline | Read |
| `docs/software-engineering/changes/CR-002.md` | Repository baseline | Read |
| `docs/software-engineering/changes/CR-003.md` | Repository baseline | Read |
| `docs/software-engineering/changes/CR-004.md` | Repository baseline | Read |
| `package.json` | Repository baseline | Read |
| `wrangler.jsonc` | Repository baseline | Read |
| Skill `06-se-architecture-design/SKILL.md` | Global skill config | Read |
| Skill `06-se-architecture-design/references/skill-docs.md` | Global skill config | Read |

## Readiness Check

Readiness decision dari Step 5: **Ready for design: Yes.**

Seluruh 24 REQ, 12 NFR, 14 BR, dan 48 AC berstatus Ready.
DEC-017 hingga DEC-022 telah menyelesaikan seluruh blocker desain.

## Skill Procedure Followed

1. Dibaca `03-specification.md` dan `05-validation-change.md` sebagai inputs utama. ✓
2. Hanya requirement bertanda Ready digunakan sebagai design input. ✓
3. Architecture style dipilih berdasarkan kesederhanaan yang cukup untuk kebutuhan. ✓
4. Components dan boundaries didefinisikan dengan jelas. ✓
5. Data flows kritis dipetakan. ✓
6. ADR dicatat dengan context, decision, options, dan consequences. ✓
7. Traceability ke REQ dan NFR dijaga. ✓

## Output Target

- `docs/software-engineering/06-architecture-design.md` — artifact utama
- `evidence/06-architecture-design/01-invocation.md` — dokumen ini
- `evidence/06-architecture-design/02-ai-output.md` — output AI awal
- `evidence/06-architecture-design/03-human-review.md` — hasil human review
