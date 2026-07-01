---
name: campus-maintenance-validation-change
description: Validate Campus Maintenance requirements, acceptance criteria, priorities, conflicts, and early change impact before architecture design.
---

# Campus Maintenance Validation and Change

## Required Inputs

1. Baca `docs/software-engineering/02-elicitation.md`.
2. Baca `docs/software-engineering/03-specification.md`.
3. Baca `docs/software-engineering/04-prioritization.md`.
4. Pertahankan ID `REQ`, `NFR`, `BR`, `AC`, `VAL`, `DEC`, dan pertanyaan terbuka.

## Workflow

1. Periksa setiap REQ/NFR untuk clear, complete, consistent, feasible, testable, dan traceable.
2. Cocokkan seluruh AC dengan requirement dan priority scope.
3. Tandai duplicate, vague, oversized, provisional, atau conflicting item dengan `VAL-###`.
4. Catat perubahan awal sebagai candidate; jangan mengedit baseline approved tanpa change record.
5. Minta keputusan stakeholder untuk temuan yang memengaruhi state, access, scope, atau quality measurement.
6. Nyatakan readiness `Yes` atau `No` beserta alasan dan route.
7. Simpan hasil di `docs/software-engineering/05-validation-change.md`.

## Required Output

- Validation matrix seluruh REQ dan NFR.
- BR dan AC coverage review.
- Findings dengan severity dan traceability.
- Early change analysis.
- Stakeholder decisions required.
- Readiness decision dan handoff routing.

## Quality Rules

- Jangan menyatakan ready bila konflik material belum diputuskan.
- Jangan mengubah arti requirement melalui prioritization.
- Perubahan material harus diarahkan ke change-log engineering loop.
- Requirement yang tidak bermasalah tidak boleh ikut dibuka ulang tanpa alasan.
- Jika valid, handoff ke `06-se-architecture-design`; jika tidak, route ke tahap sumber yang tepat.
