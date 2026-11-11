const express = require('express');
const { db } = require('../models/store');
const { DEPARTMENTS, CATEGORIES } = require('../config/taxonomy');
const { RoutingEngine } = require('../services/routingEngine');

const router = express.Router();

// GET Admin Summary Analytics
router.get('/analytics/summary', (req, res) => {
  const complaints = Array.from(db.complaints.values());

  const total = complaints.length;
  const submitted = complaints.filter(c => c.status === 'Submitted').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  const priorityBreakdown = {
    High: complaints.filter(c => c.priority === 'High').length,
    Medium: complaints.filter(c => c.priority === 'Medium').length,
    Low: complaints.filter(c => c.priority === 'Low').length
  };

  const departmentBreakdown = {};
  DEPARTMENTS.forEach(d => {
    departmentBreakdown[d.id] = { name: d.name, total: 0, resolved: 0 };
  });

  complaints.forEach(c => {
    if (departmentBreakdown[c.departmentId]) {
      departmentBreakdown[c.departmentId].total++;
      if (c.status === 'Resolved') departmentBreakdown[c.departmentId].resolved++;
    }
  });

  const categoryBreakdown = {};
  complaints.forEach(c => {
    categoryBreakdown[c.category] = (categoryBreakdown[c.category] || 0) + 1;
  });

  const wardBreakdown = {};
  complaints.forEach(c => {
    const ward = c.location.ward || 'General Ward';
    wardBreakdown[ward] = (wardBreakdown[ward] || 0) + 1;
  });

  res.json({
    success: true,
    data: {
      total,
      submitted,
      inProgress,
      resolved,
      priorityBreakdown,
      departmentBreakdown,
      categoryBreakdown,
      wardBreakdown
    }
  });
});

// GET OGD Schema Compatible CSV Export
router.get('/analytics/export.csv', (req, res) => {
  const complaints = Array.from(db.complaints.values());

  let csvContent = 'ComplaintID,Category,Priority,Status,Ward,LocalityAddress,CreatedAt,SLA_Deadline,ResolvedAt\n';

  complaints.forEach(c => {
    const sanitize = (str) => `"${(str || '').replace(/"/g, '""')}"`;
    csvContent += `${c.id},${c.category},${c.priority},${c.status},${sanitize(c.location.ward)},${sanitize(c.location.address)},${c.createdAt},${c.slaDeadline},${c.resolvedAt || ''}\n`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="ogd_civic_complaints_export.csv"');
  res.send(csvContent);
});

// POST Trigger SLA Escalation Engine
router.post('/trigger-sla-check', (req, res) => {
  const escalatedCount = RoutingEngine.checkSLAEscalations();
  res.json({
    success: true,
    message: `SLA escalation job executed successfully. ${escalatedCount} overdue complaints escalated.`,
    escalatedCount
  });
});

// GET Audit Logs
router.get('/audit-logs', (req, res) => {
  res.json({ success: true, data: db.auditLogs });
});

// GET Departments & Taxonomy Config
router.get('/departments', (req, res) => {
  res.json({ success: true, departments: DEPARTMENTS, categories: CATEGORIES });
});

module.exports = router;
