'use client'

import { useMemo, useState } from 'react'
import {
  Activity, AlertTriangle, Ban, Bell, Bot, BrainCircuit, ChevronDown, CircleGauge,
  Cpu, Database, FileWarning, Flame, FolderLock, Globe2, KeyRound, LayoutDashboard,
  LockKeyhole, Menu, Network, Play, Power, Radar, Search, Server, Shield,
  ShieldAlert, ShieldCheck, Siren, SlidersHorizontal, Terminal, UserRound, X,
} from 'lucide-react'

type Threat = { id: string; name: string; category: string; severity: 'CRITICAL'|'HIGH'|'MEDIUM'; confidence: number; score: number; source: string; status: string; time: string; process: string; reasons: string[] }

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

function Severity({ value }: { value: string }) { return <span className={`severity severity-${value.toLowerCase()}`}><span className="severity-dot" />{value}</span> }
function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <section className={`panel ${className}`}>{children}</section> }

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [threats, setThreats] = useState(initialThreats)
  const [selected, setSelected] = useState<Threat | null>(initialThreats[0])
  const [notice, setNotice] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [score, setScore] = useState(94)

  const simulate = (kind: string) => {
    const templates: Record<string, Threat> = {
      Malware: { id: 'THR-4924', name: 'Suspicious Process Behavior', category: 'Malware', severity: 'CRITICAL', confidence: 98, score: 97, source: '10.0.0.42', status: 'New', time: '20:44:02', process: 'payload.tmp', reasons: ['Unknown executable launched from /tmp', 'Abnormal access to /etc/shadow', 'Unexpected outbound network connection'] },
      Ransomware: { id: 'THR-4925', name: 'Potential Ransomware Behavior', category: 'File Activity', severity: 'CRITICAL', confidence: 99, score: 99, source: 'local', status: 'New', time: '20:44:04', process: 'backup-sync', reasons: ['File write frequency > 500/sec', 'Rapid file renaming detected', 'Sudden entropy spike across user files'] },
      'Brute Force': { id: 'THR-4926', name: 'SSH Brute Force Pattern', category: 'Authentication', severity: 'HIGH', confidence: 96, score: 91, source: '45.133.22.8', status: 'New', time: '20:44:06', process: 'sshd', reasons: ['500 failed SSH attempts in 30 seconds', 'Multiple source IPs targeting root'] },
      'Privilege Escalation': { id: 'THR-4927', name: 'Privilege Escalation Attempt', category: 'Kernel', severity: 'HIGH', confidence: 93, score: 87, source: 'local', status: 'New', time: '20:44:08', process: 'web-service', reasons: ['Non-interactive user attempted root execution', 'Kernel module load attempt'] },
      'Network Beaconing': { id: 'THR-4928', name: 'Abnormal Network Beaconing', category: 'Network', severity: 'HIGH', confidence: 90, score: 82, source: '172.16.4.19', status: 'New', time: '20:44:10', process: 'node-worker', reasons: ['Repeated outbound connections every 5 seconds', 'Unusual destination IP and port 4444'] },
    }
    const next = templates[kind]
    setThreats((current) => [next, ...current])
    setSelected(next)
    setActive('Threats')
    setScore(Math.max(62, score - 8))
    setNotice(`${kind} telemetry analyzed — ${next.severity} threat detected`)
    window.setTimeout(() => setNotice(''), 4200)
  }
  const mitigate = () => { if (!selected) return; setThreats((all) => all.map((t) => t.id === selected.id ? { ...t, status: 'Contained' } : t)); setSelected({ ...selected, status: 'Contained' }); setScore(94); setNotice('THREAT CONTAINED — Process isolated, connection blocked, restore point created'); window.setTimeout(() => setNotice(''), 5000) }
  const activity = useMemo(() => [14, 18, 16, 23, 20, 31, 28, 40, 36, 52, 48, 59, 55, 68, 63, 71, 66, 82, 75, 89, 84, 91, 88, 94], [])

  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark"><ShieldCheck size={21} /></div><div><strong>SENTINEL<span>AI</span></strong><small>LINUX SECURITY GUARD</small></div></div>
      <div className="workspace"><span className="live-dot" /> LIVE MONITORING <ChevronDown size={14} /></div>
      <nav>{nav.map(([label, Icon]) => <button key={label} className={active === label ? 'active' : ''} onClick={() => { setActive(label); setMenuOpen(false) }}><Icon size={17} /><span>{label}</span>{label === 'Threats' && <b>3</b>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="demo-box"><div><span className="live-dot orange" /> DEMO MODE</div><p>No destructive actions will execute.</p></div><button className="user"><div className="avatar">JD</div><span><strong>Jordan Davis</strong><small>Security Admin</small></span><ChevronDown size={14} /></button></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={20} /></button><div><div className="eyebrow">SECURITY OPERATIONS CENTER <span>/</span> {active.toUpperCase()}</div><h1>{active === 'Overview' ? 'System Overview' : active}</h1></div><div className="top-actions"><button className="icon-btn" aria-label="Search"><Search size={18} /></button><button className="icon-btn" aria-label="Notifications"><Bell size={18} /><i /></button><div className="system-pill"><span className="live-dot" /> <span>SYSTEM STATUS</span><strong>PROTECTED</strong></div></div></header>
      {notice && <div className="toast"><ShieldCheck size={17} />{notice}<button onClick={() => setNotice('')}><X size={15} /></button></div>}
      <div className="page-body">
        {active === 'Overview' && <>
          <div className="hero-row"><div><p className="kicker">AI-POWERED THREAT INTELLIGENCE</p><h2>Good evening, Jordan.</h2><p className="muted">Your Linux environment is being continuously analyzed for abnormal behavior.</p></div><button className="outline-btn" onClick={() => setActive('AI Analysis')}><BrainCircuit size={16} /> View AI analysis <ChevronDown size={15} /></button></div>
          <div className="metric-grid"><div className="score-card panel"><div className="metric-label">OVERALL SECURITY SCORE <CircleGauge size={15} /></div><div className="score-line"><strong>{score}</strong><span>/100</span><div className="score-ring"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="16" /><circle className="ring-value" cx="21" cy="21" r="16" /></svg></div></div><div className="trend up">↑ 2.4% <span>vs. last 24h</span></div></div><div className="panel metric"><div className="metric-label">ACTIVE THREATS <ShieldAlert size={15} /></div><strong className="red-text">{threats.filter(t => t.status !== 'Contained').length}</strong><span className="metric-sub">2 require attention</span><div className="mini-bars"><i /><i /><i className="hot" /><i /><i /></div></div><div className="panel metric"><div className="metric-label">PROCESSES MONITORED <Activity size={15} /></div><strong>1,284</strong><span className="metric-sub">↑ 4.8% from baseline</span><div className="sparkline"><svg viewBox="0 0 120 28"><polyline points="0,22 12,19 24,21 36,13 48,17 60,9 72,14 84,7 96,11 108,4 120,8" /></svg></div></div><div className="panel metric"><div className="metric-label">NETWORK CONNECTIONS <Network size={15} /></div><strong>342</strong><span className="metric-sub">12 external endpoints</span><div className="sparkline blue"><svg viewBox="0 0 120 28"><polyline points="0,20 12,21 24,15 36,18 48,8 60,14 72,10 84,14 96,5 108,12 120,6" /></svg></div></div><div className="panel metric"><div className="metric-label">FAILED LOGINS <KeyRound size={15} /></div><strong className="yellow-text">27</strong><span className="metric-sub">Last attempt 2m ago</span><div className="trend down">↓ 18.2% <span>vs. last 24h</span></div></div></div>
          <div className="dashboard-grid"><Panel className="chart-panel"><div className="panel-head"><div><h3>Threat Activity</h3><p>Events detected across your environment</p></div><div className="legend"><span><i className="dot red" /> Threats</span><span><i className="dot blue" /> Baseline</span><button className="select-btn">Last 24 hours <ChevronDown size={13} /></button></div></div><div className="chart-wrap"><div className="y-axis"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><svg className="line-chart" viewBox="0 0 600 190" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#f04b58" stopOpacity=".28" /><stop offset="1" stopColor="#f04b58" stopOpacity="0" /></linearGradient></defs><path d="M0 168 L26 158 L52 163 L78 145 L104 151 L130 132 L156 140 L182 113 L208 121 L234 96 L260 104 L286 86 L312 91 L338 67 L364 75 L390 55 L416 62 L442 38 L468 47 L494 29 L520 36 L546 17 L572 26 L600 10 L600 190 L0 190Z" fill="url(#fill)" /><path d="M0 168 L26 158 L52 163 L78 145 L104 151 L130 132 L156 140 L182 113 L208 121 L234 96 L260 104 L286 86 L312 91 L338 67 L364 75 L390 55 L416 62 L442 38 L468 47 L494 29 L520 36 L546 17 L572 26 L600 10" fill="none" stroke="#f04b58" strokeWidth="2" /></svg></div><div className="x-axis"><span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>Now</span></div></Panel>
          <Panel className="anomaly-panel"><div className="panel-head"><div><h3>AI Anomaly Score</h3><p>Isolation Forest model output</p></div><Bot size={18} className="blue-icon" /></div><div className="anomaly-score"><strong>0.82</strong><span>HIGH ANOMALY</span></div><div className="progress"><i style={{ width: '82%' }} /></div><div className="anomaly-note"><span className="live-dot orange" /> Model confidence <strong>94.6%</strong></div><div className="model-row"><span>MODEL</span><strong>isolation-forest-v2.4</strong><span className="ready">READY</span></div></Panel></div>
          <div className="lower-grid"><Panel><div className="panel-head"><div><h3>Recent Threats</h3><p>Prioritized by risk and confidence</p></div><button className="text-btn" onClick={() => setActive('Threats')}>View all <span>→</span></button></div><div className="threat-list">{threats.slice(0, 3).map(t => <button className="threat-row" key={t.id} onClick={() => { setSelected(t); setActive('Threats') }}><div className="threat-icon"><ShieldAlert size={17} /></div><div className="threat-info"><strong>{t.name}</strong><span>{t.id} · {t.time} · {t.source}</span></div><Severity value={t.severity} /><div className="confidence">{t.confidence}% <small>confidence</small></div><span className={`status status-${t.status.toLowerCase()}`}>{t.status}</span><ChevronDown className="row-arrow" size={16} /></button>)}</div></Panel><Panel className="system-panel"><div className="panel-head"><div><h3>System Resources</h3><p>Live host telemetry</p></div><Server size={18} className="blue-icon" /></div><div className="resource"><div><span>CPU UTILIZATION</span><strong>42.8%</strong></div><div className="resource-bar"><i style={{ width: '43%' }} /></div><small>8 cores · normal</small></div><div className="resource"><div><span>MEMORY USAGE</span><strong>61.2%</strong></div><div className="resource-bar blue-bar"><i style={{ width: '61%' }} /></div><small>9.8 / 16 GB · normal</small></div><div className="resource"><div><span>DISK I/O</span><strong>18.4 MB/s</strong></div><div className="resource-bar green-bar"><i style={{ width: '28%' }} /></div><small>NVMe · healthy</small></div><div className="host-footer"><span><span className="live-dot" /> Ubuntu 24.04 LTS</span><span>Uptime 14d 07h</span></div></Panel></div>
        </>}
        {active !== 'Overview' && <div className="module-view"><div className="module-title"><div><p className="kicker">SECURITY MODULE</p><h2>{active}</h2><p className="muted">{active === 'Threats' ? 'Investigate behavioral detections and explainable risk signals.' : 'Live telemetry and controls for your Linux environment.'}</p></div>{active === 'Threats' && <button className="danger-btn" onClick={mitigate}><ShieldCheck size={16} /> Mitigate selected threat</button>}</div>{active === 'Threats' && selected && <Panel className="investigation"><div className="investigation-top"><div className="threat-icon large"><ShieldAlert size={22} /></div><div><span className="eyebrow">{selected.id} · DETECTED {selected.time}</span><h3>{selected.name}</h3><span className="muted">{selected.category} · affected process <strong>{selected.process}</strong></span></div><Severity value={selected.severity} /><div className="big-score"><strong>{selected.score}</strong><span>ANOMALY SCORE</span></div></div><div className="investigation-grid"><div><h4>WHY WAS THIS DETECTED?</h4>{selected.reasons.map(r => <div className="reason" key={r}><AlertTriangle size={15} />{r}</div>)}</div><div><h4>FEATURE CONTRIBUTIONS</h4>{[['File write rate', 92], ['Process location', 78], ['Network frequency', 68], ['CPU utilization', 52], ['Memory usage', 24]].map(([label, value]) => <div className="feature" key={String(label)}><span>{label}</span><div><i style={{ width: `${value}%` }} /></div><b>{value}</b></div>)}</div></div><div className="mitigation-strip"><div><Shield size={18} /><span><strong>Safe demo mode</strong><small>No destructive system action will be executed.</small></span></div><button className="danger-btn" onClick={mitigate}>CONTAIN THREAT <ChevronDown size={14} /></button></div></Panel>}{active !== 'Threats' && <Panel className="module-placeholder"><Radar size={48} /><h3>{active} telemetry stream</h3><p>Live module view is ready for demonstration. Run an attack simulation to populate explainable events and response actions.</p><button className="outline-btn" onClick={() => simulate('Malware')}><Play size={15} /> Run demo signal</button></Panel>}{(active === 'Threats' || active === 'Response') && <div className="sim-grid">{simulations.map(({ key, icon: Icon, color, title, detail }) => <button key={key} className={`sim-card ${color}`} onClick={() => simulate(key)}><div className="sim-icon"><Icon size={19} /></div><div><strong>{title}</strong><span>{detail}</span></div><Play size={14} /></button>)}</div>}</div>}
      </div>
      <footer><span><span className="live-dot" /> All systems operational</span><span>Telemetry refreshed 4 seconds ago</span><span>SentinelAI v2.4.1</span></footer>
    </main>
  </div>
}
