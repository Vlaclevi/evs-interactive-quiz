let bank=[],quiz=[],index=0,answers={},locked={};
const $=id=>document.getElementById(id);
async function loadBank(){try{const r=await fetch('questions.json');if(!r.ok)throw Error();bank=await r.json();if(!Array.isArray(bank)||!bank.length)throw Error();begin();}catch(e){$('question').textContent='Could not load questions.json. Open this folder using VS Code Live Server.';}}
function shuffle(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function begin(){let pool=bank.map((q,i)=>({...q,original:i}));if($('shuffle').checked||$('mode').value!=='all')shuffle(pool);let n=$('mode').value==='all'?pool.length:Number($('mode').value);quiz=pool.slice(0,Math.min(n,pool.length));index=0;answers={};locked={};$('finish').hidden=true;$('quiz').hidden=false;render();}
function render(){if(index>=quiz.length){finish();return;}const q=quiz[index];$('counter').textContent=`Question ${index+1} of ${quiz.length}`;$('score').textContent=`Score: ${Object.values(answers).filter(Boolean).length}`;$('bar').style.width=`${(index/quiz.length)*100}%`;$('question').textContent=q.question;$('options').innerHTML='';$('feedback').textContent='';$('feedback').className='';
q.options.forEach((opt,i)=>{const b=document.createElement('button');b.className='option';b.textContent=`${String.fromCharCode(65+i)}. ${opt}`;b.disabled=!!locked[index];if(locked[index]&&i===q.answer)b.classList.add('correct');if(locked[index]&&answers[index]===false&&i===selectedWrong[index])b.classList.add('wrong');b.onclick=()=>choose(i);$('options').appendChild(b);});
if(locked[index]){const ok=answers[index];$('feedback').className=ok?'good':'bad';$('feedback').textContent=(ok?'Correct! ':'Not quite. Correct answer: '+q.options[q.answer]+'. ')+(q.explanation||'');}
$('prev').disabled=index===0;$('next').textContent=index===quiz.length-1?'Finish':'Next →';}
let selectedWrong={};
function choose(i){if(locked[index])return;const q=quiz[index],ok=i===q.answer;locked[index]=true;answers[index]=ok;if(!ok)selectedWrong[index]=i;render();}
$('prev').onclick=()=>{if(index>0){index--;render();}};
$('next').onclick=()=>{if(index<quiz.length-1){index++;render();}else finish();};
function finish(){$('quiz').hidden=true;$('finish').hidden=false;$('bar').style.width='100%';const correct=Object.values(answers).filter(Boolean).length;$('result').textContent=`You scored ${correct} out of ${quiz.length} (${Math.round(correct/quiz.length*100)}%).`; $('score').textContent=`Score: ${correct}`;}
$('start').onclick=begin;$('again').onclick=begin;loadBank();