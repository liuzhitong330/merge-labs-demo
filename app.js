(() => {
  const data = [
    {id:'p2s',label:'P · 2-dir saccade',task:'Two-direction saccade',subject:'Monkey P',current:40.2,pretrained:9,endpoint:'80.2% correct',detail:'75.4% without pretraining → 80.2% with pretraining',note:'The largest proportional reduction: significance arrived 31.2 trials sooner.'},
    {id:'l2s',label:'L · 2-dir saccade',task:'Two-direction saccade',subject:'Monkey L',current:103.4,pretrained:71,endpoint:'66.8% correct',detail:'62.3% without pretraining → 66.8% with pretraining',note:'A smaller relative gain, but 32.4 fewer calibration trials.'},
    {id:'p8s',label:'P · 8-dir saccade',task:'Eight-direction saccade',subject:'Monkey P',current:30.75,pretrained:10.67,endpoint:'37.8° error',detail:'45.3° without pretraining → 37.8° with pretraining',note:'Pretraining cut calibration by 65.3% while angular error improved by 7.4°.'},
    {id:'l8s',label:'L · 8-dir saccade',task:'Eight-direction saccade',subject:'Monkey L',current:132.33,pretrained:42.8,endpoint:'71.0° error',detail:'75.1° without pretraining → 71.0° with pretraining',note:'The largest absolute saving: 89.5 fewer trials to significant decoding.'},
    {id:'p2r',label:'P · 2-dir reach',task:'Two-direction reach',subject:'Monkey P',current:67.67,pretrained:43.67,endpoint:'65% correct',detail:'65% without pretraining → 65% with pretraining',note:'Calibration shortened by 24 trials with the same reported endpoint accuracy.'}
  ];
  const $ = id => document.getElementById(id);
  const fmt = n => Number.isInteger(n) ? String(n) : n.toFixed(1);
  const selector = $('selector');
  data.forEach(d => { const b=document.createElement('button'); b.type='button'; b.textContent=d.label; b.dataset.id=d.id; b.onclick=()=>render(d.id); selector.appendChild(b); });
  const maxSaved = Math.max(...data.map(d=>d.current-d.pretrained));
  [...data].sort((a,b)=>(b.current-b.pretrained)-(a.current-a.pretrained)).forEach(d=>{ const b=document.createElement('button'); b.type='button'; const saved=d.current-d.pretrained; b.innerHTML=`<span>${d.label}</span><span class="track"><span class="fill" style="width:${saved/maxSaved*100}%"></span></span><strong>${saved.toFixed(1)}</strong>`; b.onclick=()=>{render(d.id);$('analysis').scrollIntoView({behavior:'smooth'});}; $('cohorts').appendChild(b); });
  function render(id){
    const d=data.find(x=>x.id===id)||data[0], currentTop=9+(1-d.current/140)*72, pretrainedTop=9+(1-d.pretrained/140)*72, delta=pretrainedTop-currentTop, angle=Math.atan2(delta,52)*180/Math.PI, width=Math.sqrt(52*52+delta*delta);
    selector.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.id===id));
    $('subject').textContent=d.subject; $('task').textContent=d.task; $('reduction').textContent=`−${((d.current-d.pretrained)/d.current*100).toFixed(1)}%`;
    $('current').style.top=`${currentTop}%`; $('pretrained').style.top=`${pretrainedTop}%`; $('current').querySelector('strong').textContent=fmt(d.current); $('pretrained').querySelector('strong').textContent=fmt(d.pretrained);
    $('line').style.top=`${currentTop}%`; $('line').style.width=`${width}%`; $('line').style.transform=`rotate(${angle}deg)`;
    $('note').textContent=d.note; $('saved').textContent=(d.current-d.pretrained).toFixed(1); $('endpoint').textContent=d.endpoint; $('endpoint-detail').textContent=d.detail;
  }
  render('p8s');
})();
