'use client'

import { useMemo, useState } from 'react'
import {
  Activity, AlertTriangle, Bell, BrainCircuit, ChevronDown, CircleGauge, Cpu, Database,
  FileWarning, FolderLock, Globe2, KeyRound, LayoutDashboard, LockKeyhole, Menu, Network,
  Play, Radar, Search, Server, Shield, ShieldAlert, ShieldCheck, Siren, Terminal, X,
} from 'lucide-react'

type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM'
type Threat = { id: string; name: string; category: string; severity: Severity; confidence: number; score: number; source: string; status: string; time: string; process: string; reasons: string[] }

const initialThreats: Threat[] = [
  { id: 'THR-4921', name: 'Suspicious Process Behavior', category: 'Malware', severity: 'CRITICAL', confidence: 98, score: 97, source: '10.0.0.42', status: 'Investigating', time: '20:43:15', process: 'xmrig-update', reasons: ['Unknown executable launched from /tmp', 'Sensitive credential file access detected', 'Unexpected outbound network connection'] },
  { id: 'THR-4918', name: 'SSH Brute Force Pattern', category: 'Authentication', severity: 'HIGH', confidence: 94, score: 88, source: '185.72.41.9', status: 'Contained', time: '20:41:03', process: 'sshd', reasons: ['500 failed attempts in 30 seconds', 'Source IP has no prior history'] },
  { id: 'THR-4912', name: 'Privilege Escalation Attempt', category: 'Kernel', severity: 'HIGH', confidence: 91, score: 84, source: 'local', status: 'Contained', time: '20:36:47', process: 'web-service', reasons: ['Non-interactive user attempted root execution', 'Kernel module load attempt'] },
]

const nav = [
  ['Overview', LayoutDashboard], ['Threats', ShieldAlert], ['Processes', Terminal], ['Network', Network], ['Files', FolderLock], ['Authentication', KeyRound], ['AI Analysis', BrainCircuit], ['Response', Siren], ['Logs', Database],
] as const
const simulations = [
  { key: 'Malware', icon: ShieldAlert, color: 'red', title: 'Simulate Malware', detail: 'Unknown binary + sensitive file access' },
  { key: 'Ransomware', icon: FileWarning, color: 'orange', title: 'Simulate Ransomware', detail: 'High-frequency file encryption pattern' },
  { key: 'Brute Force', icon: KeyRound, color: 'yellow', title: 'Simulate Brute Force', detail: '500 failed SSH attempts / 30 sec' },
  { key: 'Privilege Escalation', icon: LockKeyhole, color: 'purple', title: 'Simulate Privilege Escalation', detail: 'Web user attempts root access' },
  { key: 'Network Beaconing', icon: Globe2, color: 'blue', title: 'Simulate Network Beaconing', detail: 'Unusual outbound connection cadence' },
]
const moduleCopy: Record<string, string> = {
  Processes: 'Inspect running processes, CPU pressure, parent-child relationships, and execution paths.',
  Network: 'Review inbound and outbound connections, destinations, ports, and beaconing signals.',
  Files: 'Monitor sensitive paths, file mutations, entropy changes, and access policy events.',
  Authentication: 'Track login attempts, source reputation, MFA state, and privileged sessions.',
  'AI Analysis': 'Review model confidence, feature contributions, and the reasoning behind detections.',
  Response: 'Use safe demo controls to acknowledge, contain, or close simulated detections.',
  Logs: 'Search the normalized event stream collected from the Linux host and security agents.',
}

function Severity({ value }: { value: Severity }) { return <span className={`severity severity-${value.toLowerCase()}`}><span className="severity-dot" />{value}</span> }
function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <section className={`panel ${className}`}>{children}</section> }

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [threats, setThreats] = useState(initialThreats)
  const [selected, setSelected] = useState<Threat | null>(initialThreats[0])
  const [notice, setNotice] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [score, setScore] = useState(94)
  const [query, setQuery] = useState('')
  const [responded, setResponded] = useState(false)

  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 4200) }
  const simulate = (kind: string) => {
    const next: Threat = { id: `THR-${4924 + threats.length}`, name: `${kind} Detection`, category: kind === 'Brute Force' ? 'Authentication' : kind, severity: kind === 'Malware' || kind === 'Ransomware' ? 'CRITICAL' : 'HIGH', confidence: 92, score: 89, source: kind === 'Network Beaconing' ? '172.16.4.19' : 'local', status: 'New', time: new Date().toLocaleTimeString('en-GB'), process: kind === 'Brute Force' ? 'sshd' : 'security-simulator', reasons: ['Behavior deviates from learned baseline', 'Suspicious activity was correlated across telemetry', 'Action is available in safe demo mode'] }
    setThreats(current => [next, ...current]); setSelected(next); setActive('Threats'); setScore(Math.max(62, score - 8)); notify(`${kind} telemetry analyzed — ${next.severity} threat detected`)
  }
  const mitigate = () => { if (!selected) return; setThreats(all => all.map(t => t.id === selected.id ? { ...t, status: 'Contained' } : t)); setSelected({ ...selected, status: 'Contained' }); setResponded(true); setScore(94); notify('THREAT CONTAINED — Safe demo response completed') }
  const filteredThreats = useMemo(() => threats.filter(t => `${t.name} ${t.category} ${t.source} ${t.process}`.toLowerCase().includes(query.toLowerCase())), [threats, query])

  const selectNav = (label: string) => { setActive(label); setMenuOpen(false); setResponded(false); setQuery('') }
  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark"><ShieldCheck size={21} /></div><div><strong>SENTINEL<span>AI</span></strong><small>LINUX SECURITY GUARD</small></div></div>
      <div className="workspace"><span className="live-dot" /> LIVE MONITORING <ChevronDown size={14} /></div>
      <nav>{nav.map(([label, Icon]) => <button key={label} className={active === label ? 'active' : ''} onClick={() => selectNav(label)}><Icon size={17} /><span>{label}</span>{label === 'Threats' && <b>{threats.filter(t => t.status !== 'Contained').length}</b>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="demo-box"><div><span className="live-dot orange" /> DEMO MODE</div><p>No destructive actions will execute.</p></div><button className="user"><div className="avatar">JD</div><span><strong>Jordan Davis</strong><small>Security Admin</small></span><ChevronDown size={14} /></button></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation"><Menu size={20} /></button><div><div className="eyebrow">SECURITY OPERATIONS CENTER <span>/</span> {active.toUpperCase()}</div><h1>{active === 'Overview' ? 'System Overview' : active}</h1></div><div className="top-actions"><button className="icon-btn" aria-label="Search" onClick={() => selectNav('Logs')}><Search size={18} /></button><button className="icon-btn" aria-label="Notifications" onClick={() => notify('No new notifications')}><Bell size={18} /></button><div className="system-pill"><span className="live-dot" /> <span>SYSTEM STATUS</span><strong>PROTECTED</strong></div></div></header>
      {notice && <div className="toast" role="status"><ShieldCheck size={17} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification"><X size={15} /></button></div>}
      <div className="page-body">
        {active === 'Overview' && <><div className="hero-row"><div><p className="kicker">AI-POWERED THREAT INTELLIGENCE</p><h2>Good evening, Jordan.</h2><p className="muted">Your Linux environment is being continuously analyzed for abnormal behavior.</p></div><button className="outline-btn" onClick={() => selectNav('AI Analysis')}><BrainCircuit size={16} /> View AI analysis <ChevronDown size={15} /></button></div><div className="metric-grid"><div className="score-card panel"><div className="metric-label">OVERALL SECURITY SCORE <CircleGauge size={15} /></div><div className="score-line"><strong>{score}</strong><span>/100</span></div><div className="trend up">↑ 2.4% <span>vs. last 24h</span></div></div><div className="panel metric"><div className="metric-label">ACTIVE THREATS <ShieldAlert size={15} /></div><strong className="red-text">{threats.filter(t => t.status !== 'Contained').length}</strong><span className="metric-sub">Require attention</span></div><div className="panel metric"><div className="metric-label">PROCESSES MONITORED <Activity size={15} /></div><strong>1,284</strong><span className="metric-sub">↑ 4.8% from baseline</span></div><div className="panel metric"><div className="metric-label">NETWORK CONNECTIONS <Network size={15} /></div><strong>342</strong><span className="metric-sub">12 external endpoints</span></div></div><div className="dashboard-grid"><Panel className="chart-panel"><div className="panel-head"><div><h3>Threat Activity</h3><p>Events detected across your environment</p></div></div><div className="chart-wrap"><div className="y-axis"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><svg className="line-chart" viewBox="0 0 600 190" preserveAspectRatio="none"><path d="M0 168 L52 163 L104 151 L156 140 L208 121 L260 104 L312 91 L364 75 L416 62 L468 47 L520 36 L600 10 L600 190 L0 190Z" fill="rgba(240,75,88,.2)" /><path d="M0 168 L52 163 L104 151 L156 140 L208 121 L260 104 L312 91 L364 75 L416 62 L468 47 L520 36 L600 10" fill="none" stroke="#f04b58" strokeWidth="2" /></svg></div></Panel><Panel className="anomaly-panel"><div className="panel-head"><div><h3>AI Anomaly Score</h3><p>Isolation Forest model output</p></div><BrainCircuit size={18} className="blue-icon" /></div><div className="anomaly-score"><strong>0.82</strong><span>HIGH ANOMALY</span></div><div className="progress"><i style={{ width: '82%' }} /></div><div className="anomaly-note"><span className="live-dot orange" /> Model confidence <strong>94.6%</strong></div></Panel></div><Panel><div className="panel-head"><div><h3>Recent Threats</h3><p>Prioritized by risk and confidence</p></div><button className="text-btn" onClick={() => selectNav('Threats')}>View all →</button></div><div className="threat-list">{threats.slice(0, 3).map(t => <button className="threat-row" key={t.id} onClick={() => { setSelected(t); selectNav('Threats') }}><div className="threat-icon"><ShieldAlert size={17} /></div><div className="threat-info"><strong>{t.name}</strong><span>{t.id} · {t.time} · {t.source}</span></div><Severity value={t.severity} /><span className={`status status-${t.status.toLowerCase()}`}>{t.status}</span></button>)}</div></Panel></>}
        {active === 'Threats' && <ThreatsView threats={filteredThreats} selected={selected} setSelected={setSelected} mitigate={mitigate} query={query} setQuery={setQuery} />}
        {active !== 'Overview' && active !== 'Threats' && <ModuleView active={active} copy={moduleCopy[active]} responded={responded} mitigate={mitigate} onSimulate={() => simulate(active === 'Network' ? 'Network Beaconing' : active === 'Authentication' ? 'Brute Force' : 'Malware')} />}
      </div>
      <footer><span><span className="live-dot" /> All systems operational</span><span>Telemetry refreshed just now</span><span>SentinelAI v2.4.1</span></footer>
    </main>
    {active === 'Overview' && <div className="simulation-dock"><div><strong>Attack simulation lab</strong><span>Safe telemetry generators</span></div>{simulations.map(s => <button key={s.key} className={`sim-btn ${s.color}`} onClick={() => simulate(s.key)} title={s.detail}><s.icon size={15} /><span>{s.title.replace('Simulate ', '')}</span><Play size={11} /></button>)}</div>}
  </div>
}

function ThreatsView({ threats, selected, setSelected, mitigate, query, setQuery }: { threats: Threat[]; selected: Threat | null; setSelected: (t: Threat) => void; mitigate: () => void; query: string; setQuery: (v: string) => void }) {
  return <div className="module-view"><div className="module-title"><div><p className="kicker">SECURITY MODULE</p><h2>Threat investigation</h2><p className="muted">Investigate behavioral detections and explainable risk signals.</p></div>{selected && <button className="danger-btn" onClick={mitigate}><ShieldCheck size={16} /> Mitigate selected threat</button>}</div><Panel className="investigation"><div className="panel-head"><div><h3>Detection queue</h3><p>{threats.length} matching detections</p></div><div className="search-box"><Search size={15} /><input aria-label="Filter threats" value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter detections" /></div></div><div className="threat-list">{threats.map(t => <button className={`threat-row ${selected?.id === t.id ? 'selected-row' : ''}`} key={t.id} onClick={() => setSelected(t)}><div className="threat-icon"><ShieldAlert size={17} /></div><div className="threat-info"><strong>{t.name}</strong><span>{t.id} · {t.process} · {t.source}</span></div><Severity value={t.severity} /><span className={`status status-${t.status.toLowerCase()}`}>{t.status}</span></button>)}</div>{selected && <div className="investigation-detail"><div className="investigation-top"><div className="threat-icon large"><ShieldAlert size={22} /></div><div><span className="eyebrow">{selected.id} · DETECTED {selected.time}</span><h3>{selected.name}</h3><span className="muted">{selected.category} · affected process <strong>{selected.process}</strong></span></div><Severity value={selected.severity} /><div className="big-score"><strong>{selected.score}</strong><span>ANOMALY SCORE</span></div></div><div className="investigation-grid"><div><h4>WHY WAS THIS DETECTED?</h4>{selected.reasons.map(r => <div className="reason" key={r}><AlertTriangle size={15} />{r}</div>)}</div><div><h4>FEATURE CONTRIBUTIONS</h4>{[['File write rate', 92], ['Process location', 78], ['Network frequency', 68], ['CPU utilization', 52]].map(([label, value]) => <div className="feature" key={String(label)}><span>{label}</span><div><i style={{ width: `${value}%` }} /></div><b>{value}</b></div>)}</div></div></div>}</Panel></div>
}

function ModuleView({ active, copy, responded, mitigate, onSimulate }: { active: string; copy: string; responded: boolean; mitigate: () => void; onSimulate: () => void }) {
  const rows: Record<string, string[]> = { Processes: ['systemd · PID 1 · 0.2% CPU · root', 'security-agent · PID 842 · 2.8% CPU · sentinel', 'node-worker · PID 2418 · 18.4% CPU · app'], Network: ['10.0.0.42:443 → api.sentinel.local · ESTABLISHED', '172.16.4.19:4444 → unknown · BLOCKED', '192.168.1.12:22 → sshd · LISTENING'], Files: ['/etc/shadow · read attempt · BLOCKED', '/var/log/auth.log · modified · 2 minutes ago', '/home/jordan/Documents · entropy normal'], Authentication: ['jordan.davis · console · MFA verified', 'root · local · session active', 'unknown · 185.72.41.9 · 500 failures · BLOCKED'], 'AI Analysis': ['Isolation Forest v2.4 · confidence 94.6%', 'Behavioral baseline · deviation 0.82', 'Feature ensemble · 4 contributing signals'], Response: ['THR-4921 · process isolation · READY', 'THR-4918 · source IP block · COMPLETE', 'THR-4912 · privilege rollback · COMPLETE'], Logs: ['20:44:10 · network anomaly · HIGH', '20:43:15 · process execution · CRITICAL', '20:41:03 · authentication failures · HIGH'] }
  return <div className="module-view"><div className="module-title"><div><p className="kicker">SECURITY MODULE</p><h2>{active}</h2><p className="muted">{copy}</p></div><div className="module-actions">{active !== 'Logs' && <button className="outline-btn" onClick={onSimulate}><Play size={15} /> Generate test event</button>}{active === 'Response' && <button className="danger-btn" onClick={mitigate}><Shield size={15} /> {responded ? 'Response complete' : 'Run safe response'}</button>}</div></div><Panel className="module-panel"><div className="panel-head"><div><h3>{active} telemetry</h3><p>Live demo stream · refreshed just now</p></div><span className="ready"><span className="live-dot" /> READY</span></div><div className="module-table">{(rows[active] || []).map((row, index) => <div className="module-row" key={row}><span className="event-time">{index === 0 ? 'NOW' : `${20 - index}:4${index}:0${index}`}</span><span>{row}</span><span className={index === 1 && active !== 'AI Analysis' ? 'status status-contained' : 'status status-investigating'}>{index === 1 ? 'MONITORED' : 'LIVE'}</span></div>)}</div></Panel><div className="module-cards"><Panel><Cpu size={18} /><strong>Host health</strong><span>42.8% CPU · normal</span></Panel><Panel><Server size={18} /><strong>Agent status</strong><span>Connected · 14d uptime</span></Panel><Panel><Radar size={18} /><strong>Detection mode</strong><span>Behavioral + rules</span></Panel></div></div>
}
