-- ============================================================================
-- NO LIMITS COMPANY - CEO DASHBOARD
-- Database Schema Initialization (Flyway Migration V1)
-- ============================================================================

-- 1. USER PROFILE AND AUTH SCOPE
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'CEO',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. DAILY SUMMARY AND FOCUS
CREATE TABLE daily_summaries (
    summary_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    summary_date DATE NOT NULL DEFAULT CURRENT_DATE,
    key_actions TEXT[] NOT NULL,
    events TEXT[] NOT NULL,
    focus_text TEXT NOT NULL,
    CONSTRAINT unique_user_date UNIQUE(user_id, summary_date)
);

-- 3. AGENDA / SCHEDULE
CREATE TABLE agenda_events (
    event_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    category VARCHAR(50), -- STRATEGIC, FINANCIAL, OPERATIONAL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PRIORITIZED TASKS
CREATE TABLE priority_tasks (
    task_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    title VARCHAR(200) NOT NULL,
    progress_percentage INT CHECK (progress_percentage BETWEEN 0 AND 100) DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, COMPLETED
    due_date DATE,
    priority_order INT NOT NULL
);

-- 5. KEY PROJECTS
CREATE TABLE key_projects (
    project_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    progress_percentage INT CHECK (progress_percentage BETWEEN 0 AND 100) DEFAULT 0,
    status VARCHAR(30) DEFAULT 'IN_PROGRESS',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. KEY PERFORMANCE INDICATORS (KPIs) WITH HISTORICAL SERIES
CREATE TABLE kpi_metrics (
    kpi_id BIGSERIAL PRIMARY KEY,
    metric_code VARCHAR(50) UNIQUE NOT NULL, -- MONTHLY_REVENUE, SALES_GROWTH, OPERATIONAL_MARGIN
    metric_name VARCHAR(100) NOT NULL,
    current_value NUMERIC(15,2) NOT NULL,
    display_format VARCHAR(20) NOT NULL, -- CURRENCY, PERCENTAGE, NUMBER
    delta_percentage NUMERIC(5,2) NOT NULL, -- e.g., +8.00, -2.50
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kpi_historical_data (
    history_id BIGSERIAL PRIMARY KEY,
    kpi_id BIGINT NOT NULL REFERENCES kpi_metrics(kpi_id) ON DELETE CASCADE,
    datapoint_value NUMERIC(15,2) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 7. NOTIFICATIONS / URGENT MESSAGES
CREATE TABLE urgent_messages (
    message_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    source_channel VARCHAR(50) NOT NULL, -- CORREO, SYSTEM, ALARM
    title VARCHAR(250) NOT NULL,
    body TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. TEAM RECENT ACTIVITY
CREATE TABLE team_activities (
    activity_id BIGSERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    activity_type VARCHAR(50) NOT NULL, -- ACHIEVEMENT, DEPLOYMENT, ALERT
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX idx_daily_summaries_user_date ON daily_summaries(user_id, summary_date);
CREATE INDEX idx_agenda_events_user_start ON agenda_events(user_id, start_time);
CREATE INDEX idx_priority_tasks_user_order ON priority_tasks(user_id, priority_order);
CREATE INDEX idx_kpi_historical_data_kpi ON kpi_historical_data(kpi_id, recorded_at);
CREATE INDEX idx_urgent_messages_user_read ON urgent_messages(user_id, is_read);
CREATE INDEX idx_team_activities_logged ON team_activities(logged_at DESC);

-- ============================================================================
-- SEED DATA
-- ============================================================================
INSERT INTO users (first_name, last_name, email, role) VALUES
('Alex', 'R.', 'alex.r@nolimits.com', 'CEO');

INSERT INTO key_projects (name, progress_percentage, status) VALUES
('Plataforma E-commerce', 75, 'IN_PROGRESS'),
('Expansión Mercado EU', 45, 'IN_PROGRESS'),
('App Móvil Corporativa', 60, 'IN_PROGRESS'),
('Optimización Cadena Suministro', 30, 'IN_PROGRESS');

INSERT INTO kpi_metrics (metric_code, metric_name, current_value, display_format, delta_percentage) VALUES
('MONTHLY_REVENUE', 'Ingresos Mensuales', 2845000.00, 'CURRENCY', 8.00),
('SALES_GROWTH', 'Crecimiento en Ventas', 12.50, 'PERCENTAGE', 2.30),
('OPERATIONAL_MARGIN', 'Margen Operativo', 34.80, 'PERCENTAGE', -1.20),
('CUSTOMER_SATISFACTION', 'Satisfacción al Cliente', 92.00, 'PERCENTAGE', 3.00),
('PROJECT_COMPLETION', 'Proyectos Completados', 18.00, 'NUMBER', 0.00);

INSERT INTO kpi_historical_data (kpi_id, datapoint_value, recorded_at)
SELECT k.kpi_id, v.val, v.ts
FROM kpi_metrics k
CROSS JOIN (
    SELECT 2450000::numeric AS val, '2025-01-01'::timestamp AS ts UNION ALL
    SELECT 2580000, '2025-02-01' UNION ALL
    SELECT 2620000, '2025-03-01' UNION ALL
    SELECT 2710000, '2025-04-01' UNION ALL
    SELECT 2845000, '2025-05-01'
) v
WHERE k.metric_code = 'MONTHLY_REVENUE';

INSERT INTO team_activities (team_name, description, activity_type) VALUES
('Ingeniería', 'Nuevo despliegue de API Gateway completado', 'DEPLOYMENT'),
('Ventas', 'Meta trimestral superada en 115%', 'ACHIEVEMENT'),
('Infraestructura', 'Alerta de capacidad en servidores de BD', 'ALERT'),
('Marketing', 'Campaña Q2 lanzada con éxito', 'ACHIEVEMENT');

INSERT INTO priority_tasks (user_id, title, progress_percentage, status, due_date, priority_order)
SELECT u.user_id, t.title, t.progress, t.status, t.due, t.prio
FROM users u
CROSS JOIN (
    SELECT 'Revisión informe financiero Q2' AS title, 80 AS progress, 'IN_PROGRESS' AS status, '2025-07-25'::date AS due, 1 AS prio UNION ALL
    SELECT 'Aprobación presupuesto expansión', 40, 'IN_PROGRESS', '2025-07-30', 2 UNION ALL
    SELECT 'Reunión con inversores', 0, 'PENDING', '2025-08-05', 3 UNION ALL
    SELECT 'Plan estratégico 2026', 15, 'PENDING', '2025-09-01', 4
) t
WHERE u.email = 'alex.r@nolimits.com';
