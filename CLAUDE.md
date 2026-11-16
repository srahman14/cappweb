## Multi-Agent Execution Rules

All agents and subagents MUST follow these rules to prevent infinite execution, unnecessary token consumption, and uncontrolled delegation.

### 1. Task Boundaries
- Every agent must have one clearly defined responsibility and a specific expected deliverable.
- Do not expand the scope of an assigned task without approval from the parent agent.
- Do not investigate unrelated issues or make unrelated improvements.
- Complete only the work necessary to fulfil the assigned task.

### 2. Delegation Limits
- Maximum of 3 concurrent subagents unless explicitly authorised.
- Subagents MUST NOT spawn additional subagents unless explicitly authorised by the parent agent.
- Maximum delegation depth: 1 (main agent → subagent).
- Do not repeatedly delegate the same task to different agents.
- Check whether an existing agent has already investigated the problem before spawning another.

### 3. Retry Limits
- Never retry the same failed operation more than 3 times.
- If an approach fails twice, reassess the approach before attempting again.
- If the same error persists after 3 attempts, stop and report:
  - What was attempted.
  - What failed.
  - The error encountered.
  - What you recommend trying next.
- Never repeatedly execute commands hoping that an intermittent failure resolves itself.

### 4. Debugging Limits
- Do not enter endless debugging loops.
- After 3 unsuccessful debugging attempts, stop and report findings.
- Do not repeatedly modify code without identifying a plausible cause.
- If a problem requires information outside your assigned scope, report it to the parent agent rather than investigating indefinitely.

### 5. Completion Criteria
- Every task must have explicit completion criteria.
- Once the criteria are satisfied, stop working immediately.
- Do not continue refactoring, optimising, or improving code after the assigned task is complete.
- Run only the tests relevant to the changes made.
- If tests fail for unrelated reasons, report them rather than attempting to fix unrelated code.

### 6. Time and Execution Limits
- Every task should have a reasonable execution budget.
- If meaningful progress has not been made after several attempts, stop and report the blocker.
- Never wait indefinitely for another agent, process, command, or external service.
- Never repeatedly poll a process without a reasonable polling interval and maximum wait time.

### 7. Communication
- Report progress to the parent agent when:
  - A significant milestone is reached.
  - A blocker is encountered.
  - The task is complete.
- Do not send repetitive progress updates.
- If blocked, communicate immediately rather than continuing indefinitely.

### 8. Mandatory Final Response

Every agent MUST finish with a concise report containing:

1. **Status:** Completed / Partially Completed / Blocked.
2. **Changes:** Files created, modified, or inspected.
3. **Verification:** Tests and checks performed.
4. **Issues:** Remaining errors, blockers, or limitations.
5. **Handover:** Anything the parent agent needs to know.

An agent must NEVER continue executing after submitting its final report unless explicitly instructed to resume.