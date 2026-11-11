# AI Civic Companion - System Data Flow Diagram (DFD)

This document provides a comprehensive **Data Flow Diagram (DFD)** specification for the entire **AI Civic Companion** platform. It documents how data flows between External Entities, Core System Processes, AI Engines, Data Stores, and Governance Escalation Workflows.

---

## 🏛️ 1. Level 0 DFD: System Context Diagram

The **Level 0 DFD** represents the entire **AI Civic Companion** platform as a single process interacting with key external entities.

```mermaid
graph TD
    classDef entity fill:#1e293b,stroke:#e2e8f0,stroke-width:2px,color:#fff;
    classDef process fill:#7c2d12,stroke:#f59e0b,stroke-width:3px,color:#fff;

    E1["👤 Citizen / Public User"]:::entity
    E2["👮 Government Staff / Field Officer"]:::entity
    E3["👨‍💼 Dept Supervisor / Director"]:::entity
    E4["🚑 Vet Rescue Team & Volunteers"]:::entity
    E5["🤖 External AI Services (Vision/NLP)"]:::entity

    P0(("0.0 <br> AI Civic Companion <br> Enterprise Platform")):::process

    E1 -->|"1. Grievance / Voice / Image / Blood Need"| P0
    P0 -->|"2. Issue Tracking, Status Alerts, Rewards"| E1

    E2 -->|"3. Field Resolution, Justifications, Updates"| P0
    P0 -->|"4. Workload Assignments, SLA Reminders"| E2

    E3 -->|"5. Escalation Review, Dept Approval"| P0
    P0 -->|"6. Governance Analytics, Delay Heatmaps"| E3

    E4 -->|"7. Animal Rescue Status, Shelter Beds"| P0
    P0 -->|"8. Emergency Dispatch, Volunteer Tasks"| E4

    E5 -->|"9. Image Features, Voice Audio"| P0
    P0 -->|"10. AI Categorization, Priority, Risk Scores"| E5
```

---

## 🔄 2. Level 1 DFD: Sub-System Process Breakdown

The **Level 1 DFD** decomposes the core system into **6 primary process modules** and maps their interactions with system Data Stores.

```mermaid
graph TD
    classDef process fill:#92400e,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef store fill:#1e3a8a,stroke:#60a5fa,stroke-width:2px,color:#fff;
    classDef entity fill:#334155,stroke:#94a3b8,stroke-width:2px,color:#fff;

    %% External Entities
    E_Citizen["👤 Citizen"]:::entity
    E_Staff["👮 Staff Officer"]:::entity
    E_Supervisor["👨‍💼 Supervisor / Director"]:::entity
    E_Rescue["🚑 Animal Rescue Team"]:::entity

    %% Processes
    P1(("1.0 <br> Multi-Modal <br> Grievance Ingestion")):::process
    P2(("2.0 <br> AI Processing & <br> Auto-Routing Engine")):::process
    P3(("3.0 <br> File Delay & SLA <br> Escalation Hierarchy")):::process
    P4(("4.0 <br> Animal Welfare & <br> Rescue Management")):::process
    P5(("5.0 <br> Emergency Blood & <br> Health Donor Board")):::process
    P6(("6.0 <br> Citizen Verification & <br> Transparency Audit")):::process

    %% Data Stores
    D1[("D1: Complaints DB")]:::store
    D2[("D2: Governance Files DB")]:::store
    D3[("D3: Animal Rescues DB")]:::store
    D4[("D4: Shelter & Vet DB")]:::store
    D5[("D5: Blood Donors DB")]:::store
    D6[("D6: Audit Trail DB")]:::store
    D7[("D7: Leaderboard DB")]:::store

    %% Data Flows
    E_Citizen -->|"Submit Voice/Photo/Text Issue"| P1
    P1 -->|"Raw Complaint Payload"| P2
    P2 -->|"Classified Category & Priority"| D1
    P2 -->|"Auto-Assign Workload"| E_Staff

    E_Staff -->|"Resolution Note / Delay Justification"| P3
    P3 -->|"File Status Update (>7d, >15d, >30d, >60d)"| D2
    P3 -->|"Level 1-4 Escalation Alert"| E_Supervisor

    E_Citizen -->|"Report Injured Animal / Abuse"| P4
    P4 -->|"Rescue Case Record"| D3
    P4 -->|"Shelter Bed Status"| D4
    P4 -->|"Emergency Dispatch"| E_Rescue

    E_Citizen -->|"Post Emergency Blood Request"| P5
    P5 -->|"Blood Request Record"| D5
    D5 -->|"Broadcast Notification"| E_Citizen

    E_Citizen -->|"Verify Resolved Issue / Feedback"| P6
    P6 -->|"Verification Record"| D6
    P6 -->|"Award Green Points"| D7
```

---

## 🔬 3. Level 2 DFD: Detailed Module Breakdown

### 3.1 Level 2 DFD - File Governance & SLA Escalation Hierarchy (Process 3.0)

```mermaid
graph TD
    classDef process fill:#78350f,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef store fill:#1e3a8a,stroke:#60a5fa,stroke-width:2px,color:#fff;
    classDef entity fill:#1e293b,stroke:#cbd5e1,stroke-width:2px,color:#fff;

    E_Staff["👮 Officer"]:::entity
    E_Super["👨‍💼 Dept Head"]:::entity
    E_Dir["🏛️ Director General"]:::entity

    P3_1(("3.1 <br> SLA Timer & <br> Bucket Monitor")):::process
    P3_2(("3.2 <br> Auto-Escalation <br> Hierarchy Router")):::process
    P3_3(("3.3 <br> Officer Delay <br> Justification Logger")):::process
    P3_4(("3.4 <br> AI Delay Risk <br> Predictor")):::process

    D2[("D2: Governance Files DB")]:::store
    D6[("D6: Audit Trail DB")]:::store

    D2 -->|"Read Pending Days"| P3_1
    P3_1 -->|"File > 7d / 15d / 30d / 60d"| P3_2

    P3_2 -->|"Level 1: Supervisor Alert"| E_Staff
    P3_2 -->|"Level 2: Dept Head Escalation"| E_Super
    P3_2 -->|"Level 3: Director General Notice"| E_Dir

    E_Staff -->|"Submit Delay Explanation"| P3_3
    P3_3 -->|"Save Justification"| D6

    D2 -->|"Historical Processing Speed"| P3_4
    P3_4 -->|"Completion Risk %"| D2
```

---

### 3.2 Level 2 DFD - Animal Welfare & Rescue System (Process 4.0)

```mermaid
graph TD
    classDef process fill:#065f46,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef store fill:#1e3a8a,stroke:#60a5fa,stroke-width:2px,color:#fff;
    classDef entity fill:#1e293b,stroke:#cbd5e1,stroke-width:2px,color:#fff;

    E_Citizen["👤 Citizen"]:::entity
    E_Vet["🩺 Vet / Rescue Team"]:::entity

    P4_1(("4.1 <br> AI Injury & <br> Species Scanner")):::process
    P4_2(("4.2 <br> Emergency Dispatch <br> & Route Optimizer")):::process
    P4_3(("4.3 <br> Shelter Bed & <br> Intake Tracker")):::process
    P4_4(("4.4 <br> Adoption & <br> Foster Management")):::process

    D3[("D3: Animal Rescues DB")]:::store
    D4[("D4: Shelter & Vet DB")]:::store

    E_Citizen -->|"Upload Animal Photo"| P4_1
    P4_1 -->|"Species & Injury Classification"| P4_2
    P4_2 -->|"Dispatch Rescue Team"| E_Vet
    P4_2 -->|"Save Rescue Case"| D3

    E_Vet -->|"Update Bed Status & Vet Logs"| P4_3
    P4_3 -->|"Update Capacity"| D4

    E_Citizen -->|"Submit Adoption Request"| P4_4
    P4_4 -->|"Update Adoption Status"| D3
```

---

## 📋 4. Data Dictionary Specification

### 4.1 Data Stores (Database Repositories)

| Store ID | Name | Description | Key Attributes |
| :--- | :--- | :--- | :--- |
| **D1** | **Complaints DB** | Stores all registered civic complaints & grievances | `id`, `category`, `description`, `location`, `priority`, `status`, `reporterId`, `assignedOfficerId`, `createdAt` |
| **D2** | **Governance Files DB** | Tracks administrative file movement & SLA status | `fileId`, `title`, `department`, `officerScore`, `pendingDays`, `slaLimit`, `escalationLevel`, `aiDelayRisk` |
| **D3** | **Animal Rescues DB** | Stores animal rescue requests & case progress | `caseId`, `species`, `severity`, `location`, `rescueTeam`, `shelterId`, `pendingHours`, `status` |
| **D4** | **Shelter & Vet DB** | Manages shelter bed capacity, food, vet records | `shelterId`, `bedsTotal`, `bedsOccupied`, `vetOnDuty`, `inventoryStatus`, `quarantineAvailable` |
| **D5** | **Blood Donors DB** | Tracks urgent blood donor requests & opted-in donors | `requestId`, `requesterName`, `bloodGroup`, `hospital`, `urgency`, `contactPhone`, `status` |
| **D6** | **Audit Trail DB** | Maintains immutable logs of officer justifications & actions | `auditId`, `referenceId`, `actionType`, `actorUid`, `timestamp`, `justificationNotes` |
| **D7** | **Leaderboard DB** | Stores citizen rewards, green points & badges | `userId`, `points`, `badge`, `verifiedComplaintsCount` |

---

### 4.2 External Entities

| Entity Name | Description | Inputs Provided | Outputs Received |
| :--- | :--- | :--- | :--- |
| **Citizen / Public User** | Primary user filing civic complaints, tracking files, & adopting animals | Voice audio, photos, text complaints, delay complaints, blood requests | Issue status updates, AI transcriptions, ETA, green points |
| **Government Staff / Field Officer** | Field workers resolving assigned civic issues & updating file statuses | Issue resolution notes, photo evidence, delay justification notes | Assigned workload list, SLA warnings, performance scores |
| **Dept Supervisor / Director** | High-level officials reviewing escalated delays & department analytics | Re-assignment commands, approval/rejection of justifications | SLA violation alerts, delay heatmaps, officer scorecards |
| **Vet Rescue Team & Volunteers** | Emergency animal rescue responders & shelter staff | Rescue status updates, animal intake logs, medical records | Emergency dispatch alerts, optimal rescue routes, volunteer tasks |
| **External AI Engine** | Multi-modal AI microservice for NLP & Computer Vision | Raw audio bytes, complaint images, historical resolution times | Auto-categories, injury severity, priority score, delay prediction |

---

### 4.3 Key Process Descriptions

1. **Process 1.0 (Multi-Modal Grievance Ingestion)**: Converts citizen input (Voice in 10 Indian languages, Camera photos, Text) into structured payloads.
2. **Process 2.0 (AI Processing & Auto-Routing Engine)**: Runs computer vision for trash/pothole/injury detection, checks duplicate filings, and routes to nearest field officer.
3. **Process 3.0 (File Delay & SLA Escalation Hierarchy)**: Tracks file pending durations (>7d, >15d, >30d, >60d), triggers 4-level escalations, and logs officer justifications.
4. **Process 4.0 (Animal Welfare & Rescue Management)**: Manages emergency rescue dispatches, shelter bed capacities, veterinary care, adoption applications, and AI species scanning.
5. **Process 5.0 (Emergency Blood & Health Board)**: Manages urgent blood donor requests and broadcasts emergency alerts to matching local donors.
6. **Process 6.0 (Citizen Verification & Transparency Audit)**: Enables citizen 2-step verification of resolved issues, awards Green Points, and publishes resolution feeds.
