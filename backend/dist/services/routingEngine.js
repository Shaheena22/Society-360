"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingEngine = void 0;
const taxonomy_1 = require("../config/taxonomy");
const store_1 = require("../models/store");
class RoutingEngine {
    /**
     * Automatic Department Assignment (FR-3.28-01)
     */
    static assignDepartment(categoryId, priority) {
        const category = taxonomy_1.CATEGORIES.find(c => c.id === categoryId) || taxonomy_1.CATEGORIES[0];
        const primaryDeptId = category.defaultDepartment;
        const slaHours = category.slaHours[priority] || 48;
        // Co-routing rule for multi-department concerns (FR-3.28-03)
        const coRoutedDepts = [];
        if (categoryId === 'water_leakage' || categoryId === 'open_manhole') {
            // Flooded roads or water leakages also co-route to Roads & Civil Infra
            coRoutedDepts.push('dept-roads');
        }
        else if (categoryId === 'deforestation_mining') {
            // Co-route to Police / Enforcement wing
            coRoutedDepts.push('dept-traffic');
        }
        return {
            primaryDeptId,
            slaHours,
            coRoutedDepts
        };
    }
    /**
     * Run background SLA escalation check for unaddressed complaints (FR-3.28-04)
     */
    static checkSLAEscalations() {
        let escalatedCount = 0;
        const now = new Date();
        for (const complaint of store_1.db.complaints.values()) {
            if (complaint.status !== 'Resolved') {
                const deadline = new Date(complaint.slaDeadline);
                if (now > deadline && !complaint.escalatedAt) {
                    // Escalation triggered
                    complaint.escalatedAt = now.toISOString();
                    complaint.escalatedLevel = (complaint.escalatedLevel || 0) + 1;
                    complaint.routingHistory.push({
                        departmentId: complaint.departmentId,
                        timestamp: now.toISOString(),
                        reason: `AUTOMATED SLA ESCALATION: SLA deadline (${complaint.slaDeadline}) passed without resolution. Escalated to Department Head.`
                    });
                    store_1.db.addAuditLog('SYSTEM_CRON', 'system', 'SLA_ESCALATION', complaint.id, `Escalated complaint ${complaint.id} to Level ${complaint.escalatedLevel} due to SLA breach.`);
                    escalatedCount++;
                }
            }
        }
        return escalatedCount;
    }
}
exports.RoutingEngine = RoutingEngine;
