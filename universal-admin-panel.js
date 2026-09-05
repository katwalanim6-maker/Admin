(function (global) {
  'use strict';

  const DEFAULTS = {
    brand: 'Control Panel',
    subtitle: 'Management console',
    logo: '◆',
    accent: '#5b5bd6',
    user: { name: 'Admin', role: 'Administrator', initials: 'AD' },
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
      { id: 'records', label: 'Records', icon: '▤' },
      { id: 'reports', label: 'Reports', icon: '◒' },
      { id: 'activity', label: 'Activity', icon: '◷' },
      { id: 'settings', label: 'Settings', icon: '⚙' }
    ],
    stats: [],
    page: { title: 'Dashboard', description: 'Your project overview at a glance.' },
    content: null,
    actions: [],
    search: true,
    notifications: true,
    userMenu: true
  };

  const STYLE = `
    :host{display:block;color:var(--cp-ink);font:14px Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--cp-bg:#f5f7fb;--cp-panel:#fff;--cp-ink:#182033;--cp-muted:#748096;--cp-line:#e7ebf2;--cp-soft:#f5f7fb;--cp-shadow:0 12px 35px rgba(16,24,40,.07);--cp-accent:#5b5bd6;--cp-sidebar:#101426;--cp-sidebar-ink:#aeb7ca;--cp-radius:16px}
    *{box-sizing:border-box}button,input,select,textarea{font:inherit}button{cursor:pointer}.cp{min-height:620px;background:var(--cp-bg);display:grid;grid-template-columns:250px minmax(0,1fr);overflow:hidden;border:1px solid var(--cp-line);border-radius:var(--cp-radius);box-shadow:var(--cp-shadow)}
    .sidebar{background:var(--cp-sidebar);color:#fff;padding:18px 13px;display:flex;flex-direction:column;min-width:0}.brand{display:flex;gap:11px;align-items:center;padding:7px 9px 24px;font-weight:800;font-size:16px}.logo{width:36px;height:36px;border-radius:11px;background:var(--cp-accent);display:grid;place-items:center;color:#fff;font-size:15px}.brand small{display:block;color:#778198;font-weight:500;font-size:10px;margin-top:2px}.nav{display:grid;gap:4px}.nav button{border:0;background:transparent;color:var(--cp-sidebar-ink);padding:10px 11px;border-radius:10px;text-align:left;display:flex;align-items:center;gap:11px}.nav button:hover,.nav button.active{background:rgba(255,255,255,.09);color:#fff}.nav .icon{width:20px;text-align:center;font-size:15px}.sidebar-foot{margin-top:auto;border-top:1px solid rgba(255,255,255,.08);padding:14px 8px 2px;color:#758097;font-size:11px}.main{min-width:0;background:var(--cp-bg)}.topbar{height:68px;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border-bottom:1px solid var(--cp-line);display:flex;align-items:center;gap:12px;padding:0 24px;position:sticky;top:0;z-index:5}.menu{display:none;background:transparent;border:0;font-size:21px}.search{height:38px;display:flex;align-items:center;gap:7px;background:var(--cp-soft);border:1px solid transparent;border-radius:10px;padding:0 11px;width:min(360px,100%)}.search:focus-within{border-color:var(--cp-accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--cp-accent) 12%,transparent)}.search input{border:0;outline:0;background:transparent;width:100%;color:var(--cp-ink)}.top-actions{margin-left:auto;display:flex;align-items:center;gap:7px}.iconbtn{border:0;background:transparent;width:38px;height:38px;border-radius:10px;color:var(--cp-muted)}.iconbtn:hover{background:var(--cp-soft);color:var(--cp-ink)}.profile{display:flex;align-items:center;gap:9px;margin-left:3px}.avatar{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--cp-accent) 15%,#fff);color:var(--cp-accent);font-weight:800;font-size:12px}.profile b{display:block;font-size:12px}.profile small{display:block;color:var(--cp-muted);font-size:11px;margin-top:1px}.content{padding:25px;max-width:1500px;margin:auto}.head{display:flex;justify-content:space-between;gap:18px;align-items:flex-end;margin-bottom:21px}.eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.1em;font-weight:800;color:var(--cp-accent)}h1{font-size:26px;line-height:1.2;margin:5px 0 0}.head p{margin:6px 0 0;color:var(--cp-muted)}.actions{display:flex;gap:8px;flex-wrap:wrap}.btn{border:1px solid var(--cp-line);background:#fff;color:var(--cp-ink);padding:9px 13px;border-radius:9px;font-weight:700}.btn:hover{border-color:#cfd5e1}.btn.primary{background:var(--cp-accent);border-color:var(--cp-accent);color:#fff}.grid{display:grid;gap:14px}.stats{grid-template-columns:repeat(4,minmax(0,1fr));margin-bottom:14px}.card{background:var(--cp-panel);border:1px solid var(--cp-line);border-radius:14px;box-shadow:0 4px 16px rgba(16,24,40,.035);overflow:hidden}.stat{padding:17px}.stat-top{display:flex;justify-content:space-between;gap:10px;color:var(--cp-muted);font-size:12px}.stat-value{font-size:25px;font-weight:850;margin-top:8px}.stat-note{font-size:11px;color:var(--cp-muted);margin-top:6px}.layout-two{grid-template-columns:minmax(0,1.55fr) minmax(260px,1fr)}.card-title{padding:15px 17px;border-bottom:1px solid var(--cp-line);font-weight:800;display:flex;justify-content:space-between;align-items:center}.card-body{padding:17px}.mini{font-size:12px;color:var(--cp-muted)}.activity{display:grid;gap:13px}.activity-row{display:grid;grid-template-columns:9px 1fr;gap:9px}.dot{width:8px;height:8px;border-radius:50%;background:var(--cp-accent);margin-top:5px}.activity-row b{font-size:12px}.activity-row span{display:block;color:var(--cp-muted);font-size:11px;margin-top:2px}.placeholder{min-height:220px;display:grid;place-items:center;text-align:center;color:var(--cp-muted);padding:25px}.placeholder strong{display:block;color:var(--cp-ink);margin-bottom:5px}
    @media(max-width:900px){.stats{grid-template-columns:repeat(2,minmax(0,1fr))}.layout-two{grid-template-columns:1fr}.cp{grid-template-columns:220px minmax(0,1fr)}}
    @media(max-width:680px){.cp{display:block;min-height:600px}.sidebar{position:absolute;z-index:20;inset:0 auto 0 0;width:250px;transform:translateX(-102%);transition:transform .2s ease;box-shadow:20px 0 50px rgba(0,0,0,.2)}.cp.menu-open .sidebar{transform:translateX(0)}.menu{display:block}.topbar{padding:0 13px}.search{display:none}.content{padding:17px 13px}.head{align-items:flex-start;flex-direction:column}.stats{grid-template-columns:1fr 1fr}.profile div:not(.avatar){display:none}}
    @media(max-width:420px){.stats{grid-template-columns:1fr}h1{font-size:22px}}
  `;

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
  const clone = (value) => JSON.parse(JSON.stringify(value));

  class UniversalAdminPanel extends HTMLElement {
    constructor(){super();this.attachShadow({mode:'open'});this.config=clone(DEFAULTS);this.active='dashboard';this.open=false;}
    connectedCallback(){this.render();}
    setConfig(config={}){this.config=merge(clone(DEFAULTS),config);this.active=config.activePage || this.active || 'dashboard';this.render();return this;}
    setData(data){this.config.data=data;this.render();return this;}
    navigate(id){if(this.config.navigation.some(item=>item.id===id)){this.active=id;this.open=false;this.render();this.emit('panel:navigate',{id});}return this;}
    on(event,handler){this.addEventListener(event,handler);return this;}
    emit(name,detail){this.dispatchEvent(new CustomEvent(name,{detail,bubbles:true,composed:true}));}
    render(){
      const c=this.config, activeItem=c.navigation.find(n=>n.id===this.active)||c.navigation[0];
      this.shadowRoot.innerHTML=`<style>${STYLE}</style><div class="cp ${this.open?'menu-open':''}">
        <aside class="sidebar"><div class="brand"><span class="logo">${esc(c.logo)}</span><span>${esc(c.brand)}<small>${esc(c.subtitle)}</small></span></div>
        <nav class="nav">${c.navigation.map(n=>`<button class="${n.id===this.active?'active':''}" data-nav="${esc(n.id)}"><span class="icon">${esc(n.icon||'•')}</span>${esc(n.label)}</button>`).join('')}</nav>
        <div class="sidebar-foot">Reusable control panel · ${esc(c.version||'v1.0')}</div></aside>
        <main class="main"><header class="topbar"><button class="menu" data-menu aria-label="Open navigation">☰</button>${c.search?`<label class="search">⌕<input data-search placeholder="Search..." aria-label="Search"></label>`:''}<div class="top-actions">${c.notifications?'<button class="iconbtn" data-notify aria-label="Notifications">♢</button>':''}${c.userMenu?`<div class="profile"><div class="avatar">${esc(c.user.initials||initials(c.user.name))}</div><div><b>${esc(c.user.name)}</b><small>${esc(c.user.role)}</small></div></div>`:''}</div></header>
        <section class="content"><div class="head"><div><div class="eyebrow">${esc(c.sectionLabel||'Control Panel')}</div><h1>${esc(activeItem?.label||c.page.title)}</h1><p>${esc(c.page.description||'')}</p></div><div class="actions">${(c.actions||[]).map((a,i)=>`<button class="btn ${a.primary?'primary':''}" data-action="${i}">${esc(a.label)}</button>`).join('')}</div></div>${this.body(activeItem)}</section></main></div>`;
      this.bind();
    }
    body(item){
      const c=this.config;
      if(typeof c.content==='function'){const custom=c.content({page:this.active,item,config:c,data:c.data||{},h:esc});if(custom!==null&&custom!==undefined)return custom;}
      if(this.active==='dashboard') return this.dashboard();
      return `<div class="card"><div class="card-title">${esc(item?.label||'Content')}<span class="mini">Project module</span></div><div class="placeholder"><div><strong>${esc(item?.label||'Module')}</strong>${esc(item?.description||'This area is ready for your project-specific UI.')}</div></div></div>`;
    }
    dashboard(){const c=this.config,stats=c.stats||[];return `<div class="grid stats">${stats.length?stats.map(s=>`<div class="card stat"><div class="stat-top"><span>${esc(s.label)}</span><span>${esc(s.icon||'')}</span></div><div class="stat-value">${esc(s.value)}</div><div class="stat-note">${esc(s.note||'')}</div></div>`).join(''):`<div class="card" style="grid-column:1/-1"><div class="placeholder"><div><strong>Dashboard ready</strong>Add <code>stats</code> and a <code>content</code> renderer in your project configuration.</div></div></div>`}</div><div class="grid layout-two"><div class="card"><div class="card-title">Project workspace <span class="mini">Configurable</span></div><div class="placeholder"><div><strong>Your project UI goes here</strong>The shell, navigation, responsive behavior and shared controls stay reusable.</div></div></div><div class="card"><div class="card-title">Recent activity</div><div class="card-body"><div class="activity">${(c.activity||[]).slice(0,6).map(a=>`<div class="activity-row"><i class="dot"></i><div><b>${esc(a.action)}</b><span>${esc(a.meta||'')}</span></div></div>`).join('')||'<div class="mini">No activity configured.</div>'}</div></div></div></div>`}
    bind(){
      this.shadowRoot.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>this.navigate(b.dataset.nav)));
      this.shadowRoot.querySelector('[data-menu]')?.addEventListener('click',()=>{this.open=!this.open;this.render()});
      this.shadowRoot.querySelector('[data-notify]')?.addEventListener('click',()=>this.emit('panel:notification',{message:'Notifications clicked'}));
      this.shadowRoot.querySelector('[data-search]')?.addEventListener('input',e=>this.emit('panel:search',{query:e.target.value}));
      this.shadowRoot.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{const action=this.config.actions[Number(b.dataset.action)];this.emit('panel:action',action);if(action?.onClick)action.onClick(this)}));
    }
  }

  function initials(name='Admin'){return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()||'AD'}
  function merge(target,source){Object.keys(source||{}).forEach(k=>{if(source[k]&&typeof source[k]==='object'&&!Array.isArray(source[k])&&target[k]&&typeof target[k]==='object')merge(target[k],source[k]);else target[k]=source[k]});return target}

  if(!customElements.get('universal-admin-panel')) customElements.define('universal-admin-panel',UniversalAdminPanel);
  global.UniversalAdminPanel={version:'1.0.0',defaults:clone(DEFAULTS),create(config){const panel=document.createElement('universal-admin-panel');panel.setConfig(config);return panel;},mount(target,config){const host=typeof target==='string'?document.querySelector(target):target;if(!host)throw new Error('UniversalAdminPanel.mount: target not found');const panel=this.create(config);host.appendChild(panel);return panel;}};
})(window);
