# Session Types in FoundersTalk

This platform supports **two types of mentorship sessions** to provide maximum flexibility for both mentors and mentees.

## 1. One-on-One Sessions (Mentee-Initiated)

### How it works:
- **Mentees** browse available mentors
- **Mentees** request 1-on-1 sessions with specific mentors
- **Mentors** review and accept/reject requests
- Perfect for personalized, targeted mentoring

### API Endpoints:
```
POST /api/sessions/           # Create 1-on-1 session request
PUT  /api/sessions/:id/accept # Accept session (mentor only)
PUT  /api/sessions/:id/reject # Reject session (mentor only)
```

### Use Cases:
- Career guidance
- Technical problem-solving
- Business strategy consulting
- Personal development coaching

## 2. Group Sessions (Mentor-Initiated)

### How it works:
- **Mentors** create available group sessions/workshops
- **Mentees** browse and join sessions that interest them
- Multiple mentees can participate in the same session
- Perfect for workshops, classes, and group learning

### API Endpoints:
```
POST /api/sessions/group              # Create group session (mentor only)
POST /api/sessions/group/:id/join     # Join group session (mentee only)
```

### Use Cases:
- Skill-building workshops
- Industry knowledge sharing
- Networking events
- Educational classes

## Session Status Flow

### One-on-One Sessions:
```
pending → accepted → completed
     ↓
  rejected/cancelled
```

### Group Sessions:
```
open → full → completed
  ↓
cancelled
```

## Key Differences

| Feature | One-on-One | Group |
|---------|------------|-------|
| **Initiator** | Mentee | Mentor |
| **Participants** | 1 mentee | Multiple mentees |
| **Pricing** | Based on mentor's hourly rate | Fixed amount per session |
| **Flexibility** | High (custom scheduling) | Medium (pre-scheduled) |
| **Personalization** | High | Medium |

## Benefits of Hybrid Approach

✅ **Flexibility**: Supports both personalized and group learning
✅ **Scalability**: Mentors can reach more mentees through group sessions
✅ **Accessibility**: Lower cost for mentees in group sessions
✅ **Personalization**: 1-on-1 sessions for specific needs
✅ **Community**: Group sessions foster networking and peer learning

## Implementation Notes

- Both session types use the same database model with different `sessionMode` values
- Group sessions have `participants` array instead of single `mentee` field
- Status management differs between session types
- Payment models are different (hourly vs. per-session) 