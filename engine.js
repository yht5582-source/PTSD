(function(root){
'use strict';
const groups=[
{key:'B',title:'再體驗',min:1,items:['不由自主的創傷記憶','與事件相關的惡夢','彷彿事件再次發生','線索引發強烈情緒','線索引發身體反應']},
{key:'C',title:'逃避',min:1,items:['迴避相關想法或情緒','迴避外在提醒物']},
{key:'D',title:'認知與情緒改變',min:2,items:['重要事件片段失憶','持續負面的信念','持續自責或責怪他人','持續負面情緒','興趣明顯減退','疏離或隔絕感','難以感受正向情緒']},
{key:'E',title:'警覺與反應改變',min:2,items:['易怒或攻擊行為','冒險或自毀行為','過度警戒','容易受驚嚇','難以集中注意力','睡眠困擾']}];
const defaults=()=>({age:'',event:'',exposure:'',elapsed:'',duration:'',risk:'',impairment:'',excluded:'',confirmed:false,symptoms:Array(20).fill(''),pcl:'',preference:'',access:'',bipolar:'',pregnant:'',renal:'',liver:'',interaction:'',bp:'',nightmares:'',orthostasis:'',comorbid:[],med:'',prior:'',goal:''});
const urgent=['imminent','violence','withdrawal'];
function diagnose(s){
if(urgent.includes(s.risk))return {code:'urgent',tone:'danger',title:'優先緊急處置',text:'暫停一般門診演算法；安排急診或緊急精神醫療評估。維持陪伴與安全環境，依院內流程處理。'};
if(!s.risk)return {code:'incomplete',tone:'warn',title:'尚未完成安全評估',text:'請先確認自傷、傷人、持續受暴、急性精神症狀與戒斷風險。未評估不代表沒有風險。'};
if(s.risk==='ideation'||s.risk==='unsafe')return {code:'priority',tone:'danger',title:'當日完整風險與保護評估',text:s.risk==='ideation'?'有自傷想法，即使沒有計畫也須當日完整評估、共同安全計畫與密集追蹤；若無法確保安全，轉急診。':'先處理持續受暴與環境安全，連結保護及社會資源，再由團隊規劃後續治療。'};
if(!s.age)return {code:'incomplete',tone:'warn',title:'請補齊年齡族群',text:'成人與兒少採不同評估與治療路徑。'};
if(['child','young'].includes(s.age))return {code:'child',tone:'warn',title:'轉入兒少專科評估',text:'不套用成人症狀計數、PCL-5門檻或成人劑量。由兒少精神科進行年齡適切訪談、保護需求及照顧者評估，規劃創傷焦點心理治療；NICE不建議以藥物預防或治療未滿18歲者的PTSD。'};
if(!s.exposure||s.exposure==='unknown')return {code:'incomplete',tone:'warn',title:'須釐清創傷暴露條件 A',text:'事件名稱本身不能決定是否符合條件；請釐清事件性質與暴露方式。'};
if(s.exposure==='no')return {code:'other',tone:'info',title:'目前未符合 PTSD 創傷暴露條件',text:'評估適應障礙、憂鬱、焦慮、哀傷或其他疾病；症狀與痛苦仍應獲得照護。'};
if(!s.elapsed||!s.duration)return {code:'incomplete',tone:'warn',title:'請補齊事件與症狀時間',text:'事件發生多久與症狀持續多久必須分開確認。'};
if(s.duration==='long'&&['days','month'].includes(s.elapsed))return {code:'incomplete',tone:'warn',title:'時間資料互相矛盾',text:'事件未超過一個月，症狀卻填為超過一個月；請核對是否有較早或多次創傷。'};
if(s.duration!=='long'){const recent=['days','month'].includes(s.elapsed);return {code:'acute',recent,tone:'info',title:!recent?'症狀時間尚未符合 PTSD':s.duration==='days'?'急性創傷反應評估':'評估急性壓力疾患（ASD）',text:!recent?'創傷已超過1個月，但目前症狀尚未持續超過1個月；釐清延遲出現、新事件與其他原因。不能僅因症狀未滿1個月就診斷ASD，安排訪談與短期追蹤。':s.duration==='days'?'症狀未滿3天，不診斷ASD或PTSD。提供實際支持與安全照護，若明顯惡化立即評估。':'症狀3天至1個月，尚未符合PTSD時間條件。ASD有不同症狀規則，須另行評估；ASD或明顯症狀可轉創傷焦點CBT，亞閾值者主動監測並於1個月內聯繫。'};}
let i=0;const clusters=groups.map(g=>{const v=s.symptoms.slice(i,i+g.items.length);i+=g.items.length;return {...g,count:v.filter(x=>x==='yes').length,missing:v.filter(x=>!x).length};});const missing=clusters.reduce((a,g)=>a+g.missing,0);
if(missing||!s.impairment||!s.excluded)return {code:'incomplete',tone:'warn',title:'診斷資料尚未完整',text:`尚有${missing}項症狀未評估；也須確認明顯痛苦／功能影響與物質、藥物或身體疾病的解釋。`,clusters};
if(s.excluded!=='yes')return {code:'differential',tone:'warn',title:'優先釐清其他原因',text:'物質、藥物、腦傷、睡眠或其他身體疾病仍可能解釋症狀，不能僅以症狀計數判定PTSD。',clusters};
if(s.impairment!=='yes'||clusters.some(g=>g.count<g.min))return {code:'subthreshold',tone:'info',title:'目前資料未達完整 PTSD 條件',text:'可能為亞閾值創傷相關症狀或其他疾病，安排臨床訪談及照護；單一量表總分不能補足缺少的診斷條件。',clusters};
return {code:'probable',tone:'success',title:s.confirmed?'醫師已確認：進入 PTSD 治療規劃':'資料符合 PTSD 診斷方向，待醫師確認',text:'A、B≥1、C≥1、D≥2、E≥2、症狀超過1個月、明顯痛苦／功能影響及排除條件均已勾選。結合臨床訪談，必要時使用CAPS-5；本工具不自行確診。',clusters};
}
function plan(s){
const d=diagnose(s),p={diagnosis:d,psych:[],warnings:[],drug:null};
if(['urgent','priority','incomplete','child'].includes(d.code)){p.psych.push(d.text);return p;}
if(d.code==='acute'){p.psych.push(d.text,'提供心理急救、生活支持與睡眠衛教；不要強迫詳述創傷、不使用單次心理晤談debriefing或常規藥物預防PTSD。');return p;}
if(d.code!=='probable'){p.psych.push(d.text);return p;}
p.psych.push('優先共同討論由受訓治療師提供的個別創傷焦點心理治療：CPT、PE或EMDR。依偏好、可近性、既往反應及治療師訓練選擇，沒有單一個案必然最佳的模式。');
if(s.access==='no')p.psych.push('協助轉介或評估適當遠距服務，等待期間提供支持；可依偏好討論具實證的藥物或其他手冊化心理治療。');
if(s.preference==='combined')p.psych.push('可依共病與偏好共同使用心理與藥物治療；證據不足以宣稱常規合併一定優於單一實證治療。');
if(s.comorbid.includes('substance'))p.warnings.push('物質使用障礙應與PTSD協同治療，不因共病一概排除創傷焦點治療；急性中毒或戒斷先處置。');
if(s.comorbid.includes('dissociation'))p.warnings.push('明顯解離／複雜創傷由受訓團隊調整節奏，評估ICD-11複雜性PTSD；不由此表自動診斷。');
if(s.prior==='failed')p.warnings.push('充分治療仍無效：先核對診斷、共病、依從性、劑量及療程品質，轉專科討論更換實證治療，不自動疊加抗精神病藥。');
if(!s.confirmed){p.warnings.push('須先由醫師完成臨床診斷確認；暫不產生個別化藥物劑量。');return p;}
if(!s.preference||!s.access){p.warnings.push('請補齊治療偏好與心理治療可近性。');return p;}
if(['therapy','undecided'].includes(s.preference)){p.warnings.push(s.preference==='therapy'?'目前選擇心理治療，不自動加藥。惡夢持續可另與醫師討論。':'先比較實證心理治療與藥物的效益、負擔與偏好，完成共同決策。');return p;}
const checks=['bipolar','pregnant','renal','liver','interaction','bp','nightmares','orthostasis'];
if(checks.some(k=>!s[k]||s[k]==='unknown')){p.warnings.push('用藥安全評估尚未完整：躁症史、懷孕、肝腎功能、交互作用、血壓、惡夢與姿勢性症狀均須確認；暫不提供個別化起始劑量。');return p;}
if(s.bipolar==='yes'){p.warnings.push('疑似或已知雙相：轉精神科評估，不直接使用抗憂鬱劑單方。');return p;}
if(s.pregnant==='yes'){p.warnings.push('懷孕、備孕或哺乳：轉周產期共同決策，評估既往反應與母嬰風險，不自動產生標準處方。');return p;}
if(s.interaction!=='clear'){p.warnings.push('過敏或交互作用尚待處理：先由醫師／藥師核對。MAOI、linezolid與靜脈methylene blue等可能有嚴重交互作用。');return p;}
if(['moderate','severe'].includes(s.liver)){p.warnings.push('中重度肝功能不全：sertraline仿單不建議使用；其他藥物亦須調整，交專科與藥師規劃。');return p;}
const med=s.med||'sertraline';
if(med==='venlafaxine'&&s.bp==='high'){p.warnings.push('未控制高血壓：先控制血壓，暫不建議開始venlafaxine。');return p;}
if(med==='sertraline')p.drug={name:'Sertraline',reason:'具PTSD實證，通常不需因腎功能不全調整；適合共同討論的起始選項，仍須檢視既往反應。',start:s.liver==='mild'?'12.5 mg每日一次；依可用劑型由藥師核對':'25 mg每日一次，約1週後視耐受性至50 mg／日',range:s.liver==='mild'?'輕度肝病：起始及最高劑量為一般劑量一半；最高100 mg／日':'一般治療範圍50–200 mg／日；最高200 mg／日',titrate:'需要時每次增加25–50 mg，間隔至少1週；高齡者慢調。',monitor:'噁心、腹瀉、性功能障礙、躁動、低血鈉、出血與血清素症候群；依風險追蹤血鈉。'};
if(med==='paroxetine')p.drug={name:'Paroxetine（速放）',reason:'具PTSD實證；須權衡停藥症狀、抗膽鹼作用與交互作用。高齡、跌倒或認知問題者通常優先討論替代選項。',start:s.age==='older'||['severe','dialysis'].includes(s.renal)||s.liver==='mild'?'10 mg每日一次，後續慢調':'20 mg每日一次',range:s.age==='older'||['severe','dialysis'].includes(s.renal)?'此族群最高40 mg／日':'依所引速放仿單PTSD最高50 mg／日；不可套用其他製劑',titrate:'如需調整，每次增加10 mg，間隔至少1週。輕度肝病採保守起始，由醫師個別評估。',monitor:'口乾、便秘、嗜睡、性功能障礙、低血鈉、停藥症狀與CYP2D6交互作用（如tamoxifen）；勿突然停藥。'};
if(med==='venlafaxine'){const adjust=['severe','dialysis'].includes(s.renal)?'CrCl<30 mL/min或血液透析：總日劑量減少至少50%，核對製劑。':['mild','moderate'].includes(s.renal)?'CrCl 30–89 mL/min：總日劑量減少25–50%。':'';p.drug={name:'Venlafaxine XR',reason:'具PTSD實證；美國PTSD適應症屬仿單外使用，須討論並核對本地仿單。',start:adjust||s.liver==='mild'?'先核對調整後處方及可用劑型，不套用一般起始劑量。':'一般可由37.5 mg每日一次隨餐開始，再依耐受性調整',range:'VA PTSD目標75–300 mg／日；可能超過當地或該製劑核准上限，高劑量須專科及仿單核對。',titrate:adjust+(s.liver==='mild'?' 輕度肝病總日劑量減少50%；合併腎病不可機械相乘。':'')+' 依耐受性與血壓慢調。',monitor:'追蹤血壓、脈搏、血鈉、噁心與性功能；停藥反應常見，應個別化漸減。'};}
if(s.nightmares==='yes')p.warnings.push(s.bp==='low'||s.orthostasis==='yes'?'惡夢合併低血壓／姿勢性症狀：不自動建議prazosin，先評估跌倒、降壓藥及睡眠共病。':'惡夢持續可與醫師討論prazosin（僅針對惡夢，不作整體PTSD單方治療），常由睡前1 mg起，依血壓及反應慢調。注意首劑暈厥、降壓藥與PDE5抑制劑併用。');
p.warnings.push('起始或調整抗憂鬱劑後，追蹤自傷風險、躁化及血清素症候群；勿自行加減或突然停藥。');
if(s.age==='older'||['severe','dialysis'].includes(s.renal))p.warnings.push('高齡／進階腎病：核對血鈉、跌倒、出血、透析低血壓與多重用藥，安排較早回診。');return p;
}
function followup(records){
if(!records.length)return {tone:'info',title:'尚無追蹤紀錄',text:'建立基準後持續使用相同量表版本、相關事件與回顧期間。'};
const rows=[...records].sort((a,b)=>a.date.localeCompare(b.date)),last=rows.at(-1),base=rows[0],delta=base.pcl-last.pcl;
if(urgent.includes(last.risk))return {tone:'danger',title:'立即啟動緊急評估',text:'最新紀錄出現急迫風險；不論量表是否下降，均先處理安全。'};
if(last.risk!=='none')return {tone:'danger',title:'當日重新評估安全',text:'有自傷想法或持續不安全；先做完整風險評估，必要時緊急處理。'};
if(last.side==='serious')return {tone:'danger',title:'疑似嚴重反應，立即醫療評估',text:'出現發燒伴肌強直／意識改變、躁化、暈厥或其他嚴重反應，不等待例行回診。'};
if(last.side==='mild')return {tone:'warn',title:'有困擾的副作用，聯繫醫師檢視',text:'核對時間、劑量與交互作用，共同調整，不自行突然停藥。分數改善仍應處理治療負擔。',delta};
if(rows.length===1)return {tone:'info',title:'已建立追蹤基準',text:'建議起始治療後1–2週檢視安全及耐受性，再每2–4週評估症狀與功能；此為可調整的門診流程。',delta:0};
if(delta<=-10||last.function>base.function+2)return {tone:'warn',title:'症狀或功能惡化，提早回診',text:'核對新創傷、持續威脅、診斷、共病、依從性與副作用；不能只依量表自動加藥。',delta};
if(delta>=10)return {tone:'success',title:'量表出現具意義的改善訊號',text:'PCL-5較基準下降至少10分可作反應指標，仍須確認功能、安全、惡夢與病人目標，不能等同緩解或治癒。',delta};
if(last.weeks>=8&&last.adequate==='yes')return {tone:'warn',title:'充分治療後改善有限，重評治療',text:'先確認足夠劑量、時間及心理治療品質，再共同討論優化或更換治療。8週為本工具回顧提醒，非所有療法固定失敗門檻。',delta};
return {tone:'info',title:'持續追蹤並檢視治療負擔',text:'尚未達下降10分的反應指標；依耐受性、療程進度與功能共同決策，無自動加藥／停藥規則。',delta};
}
const cases=[
['交通事故後反覆再體驗',{pcl:'48',preference:'therapy'},'A–H條件完整且醫師確認；偏好心理治療時優先討論CPT／PE／EMDR，不自動加藥。'],
['事件後兩週，症狀明顯',{elapsed:'month',duration:'month',pcl:'',confirmed:false},'症狀未滿1個月不診斷PTSD；另以ASD規則評估，提供支持並於1個月內追蹤。'],
['高齡、CKD、偏好藥物',{age:'older',renal:'severe',pcl:'43',preference:'med'},'Sertraline通常不需因腎功能調整；高齡與進階腎病仍須慢調並追蹤血鈉、跌倒及出血。'],
['血液透析合併低血壓惡夢',{renal:'dialysis',bp:'low',orthostasis:'yes',nightmares:'yes',pcl:'46',preference:'med'},'惡夢合併低血壓／姿勢性症狀時不自動建議prazosin，先評估跌倒與透析低血壓。'],
['自傷計畫，緊急評估',{risk:'imminent',pcl:'62',confirmed:false},'有自傷計畫或無法確保安全時，暫停一般演算法，直接啟動緊急評估。'],
['青少年受暴後症狀',{age:'young',event:'violence',pcl:'',confirmed:false},'兒少不套用成人PCL-5門檻與劑量，轉兒少專科並評估保護需求。'],
['疑似雙相，偏好藥物',{bipolar:'yes',preference:'med',pcl:'45'},'疑似或已知雙相不直接使用抗憂鬱劑單方，先轉精神科評估。'],
['高分但無逃避症狀',{symptoms:['yes','yes','yes','yes','yes','no','no',...Array(13).fill('yes')],pcl:'54',confirmed:false},'PCL-5高分不能補足缺少的C群逃避症狀，結果為亞閾值，需臨床訪談。'],
['懷孕中受暴後，偏好藥物',{event:'violence',pregnant:'yes',preference:'med',pcl:'50'},'懷孕、備孕或哺乳轉周產期共同決策，工具不自動產生標準處方。'],
['中度肝硬化，偏好藥物',{event:'medical',liver:'moderate',preference:'med',pcl:'47'},'Child-Pugh B以上不建議sertraline，其他藥物交專科及藥師規劃。'],
['未控制高血壓，想比較venlafaxine',{event:'disaster',bp:'high',preference:'med',med:'venlafaxine',pcl:'52'},'血壓未控制時先控制血壓，暫不開始venlafaxine；可改比較其他選項。'],
['酒精使用合併明顯解離',{event:'violence',comorbid:['substance','dissociation','depression'],preference:'combined',pcl:'58'},'物質使用協同治療、不一概排除創傷治療；解離由受訓團隊調整節奏並評估複雜性PTSD。'],
['充分治療後反應不佳，惡夢持續',{event:'work',prior:'failed',preference:'med',med:'sertraline',nightmares:'yes',pcl:'51'},'先核對診斷、共病、依從性及療程品質；prazosin只針對惡夢，不自動疊加抗精神病藥。'],
['持續家暴，環境不安全',{event:'violence',risk:'unsafe',pcl:'55',confirmed:false},'持續受暴屬當日優先：先處理環境安全與保護資源，再規劃治療。'],
['頭部外傷後，其他原因待排除',{excluded:'no',pcl:'44',confirmed:false},'腦傷、物質、藥物或睡眠疾患仍可能解釋症狀時，先鑑別，不以症狀計數判定PTSD。'],
['多年前災難，近兩週新症狀',{event:'disaster',elapsed:'year',duration:'month',pcl:'',confirmed:false},'舊創傷伴短期新症狀不自動判為ASD或PTSD，釐清延遲出現與新事件並短期追蹤。']];
function example(i){return {...defaults(),age:'adult',event:'accident',exposure:'yes',elapsed:'year',duration:'long',risk:'none',impairment:'yes',excluded:'yes',confirmed:true,symptoms:['yes','yes','no','yes','yes','yes','yes','no','yes','yes','yes','yes','no','no','yes','no','yes','yes','no','yes'],pcl:'48',preference:'therapy',access:'yes',bipolar:'no',pregnant:'no',renal:'normal',liver:'normal',interaction:'clear',bp:'normal',nightmares:'no',orthostasis:'no',prior:'new',...cases[i][1]};}
const api={groups,defaults,diagnose,plan,followup,cases,example};root.PTSD=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
