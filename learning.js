(function(root){
'use strict';
const questions=[
{id:'q01',level:'basic',topic:'安全分流',branch:'safety',stem:'病人已有明確自傷計畫，且無法確保當下安全。最優先的處置是？',options:['安排緊急醫療評估並維持安全與陪伴','先填完PCL-5再判斷','先試抗憂鬱劑兩週','一個月後再追蹤'],answer:0,explain:'急迫危險優先於量表、確診及一般門診治療，依院內緊急流程處理。量表低分不能否定危險。',refs:[1]},
{id:'q02',level:'basic',topic:'創傷暴露',branch:'diagnosis',stem:'哪一種情境通常不能單憑該情境符合創傷暴露條件A？',options:['親身遭受威脅生命的攻擊','現場目睹嚴重暴力','非工作需要而觀看災難新聞','職務反覆接觸創傷事件細節'],answer:2,explain:'一般非工作媒體暴露通常不符合條件A；職務相關暴露須另評估。即使不符條件A，痛苦仍應獲得照護。',refs:[3]},
{id:'q03',level:'basic',topic:'時間條件',branch:'early',stem:'重大車禍後第14天出現明顯創傷症狀。最適切的診斷方向是？',options:['可單憑時間確診PTSD','評估ASD與早期創傷反應，尚未達PTSD時間條件','所有個案等一年才評估','用PTSD症狀群直接確診ASD'],answer:1,explain:'PTSD需症狀超過1個月。ASD採不同規則，不能套用PTSD症狀群門檻；明顯症狀可安排早期專業介入。',refs:[1,2,3]},
{id:'q04',level:'basic',topic:'症狀門檻',branch:'diagnosis',stem:'成人PTSD的B／C／D／E症狀群最低數目，哪組正確？',options:['1／0／2／2','2／2／2／2','1／1／1／1','1／1／2／2'],answer:3,explain:'B再體驗至少1項、C逃避1項、D認知情緒2項、E警覺反應2項，且其餘診斷條件也須完整。',refs:[3]},
{id:'q05',level:'basic',topic:'PCL-5解讀',branch:'diagnosis',stem:'PCL-5為45分，最適切的解讀是？',options:['支持進一步評估，仍須訪談及完整診斷條件','自動確診PTSD','可省略創傷暴露條件','可由分數直接決定藥物劑量'],answer:0,explain:'PCL-5用於篩檢及量測變化。31–33分僅為依族群與目的調整的參考，不能單獨確診或決定處方。',refs:[4]},
{id:'q06',level:'basic',topic:'標準化訪談',branch:'diagnosis',stem:'需要更完整確認PTSD時，哪個是標準化臨床訪談工具？',options:['只看睡眠時數','CAPS-5','只用PCL-5總分','只問有沒有惡夢'],answer:1,explain:'CAPS-5可由受訓臨床人員使用。量表總分、睡眠或單一症狀都不能取代完整診斷。',refs:[4]},
{id:'q07',level:'basic',topic:'心理治療',branch:'psychotherapy',stem:'VA/DoD 2023優先支持討論的成人個別創傷焦點心理治療是？',options:['單次強制情緒宣洩','所有非結構支持談話均優於實證治療','CPT、PE、EMDR','只有睡眠衛教'],answer:2,explain:'CPT、PE及EMDR為主要實證選項，須由受訓人員提供，依偏好、可近性與既往反應共同選擇。',refs:[5]},
{id:'q08',level:'basic',topic:'早期照護',branch:'early',stem:'關於創傷後預防PTSD，最適切的是？',options:['所有人立即服用benzodiazepine','要求每人強迫詳述事件一次','完全不提供支持','提供支持與追蹤，不常規使用單次心理debriefing'],answer:3,explain:'依需要提供心理急救與生活支持；NICE不建議心理debriefing，也不常規給藥預防PTSD。',refs:[2]},
{id:'q09',level:'basic',topic:'藥物證據',branch:'medication',stem:'成人PTSD選擇藥物時，哪組具有VA/DoD主要實證支持？',options:['Sertraline、paroxetine、venlafaxine','所有SSRI的PTSD證據完全相同','Benzodiazepine、cannabis、risperidone','Prazosin單方處理全部PTSD'],answer:0,explain:'三者為主要實證選項，仍須核對核准適應症、製劑與個別風險；同類藥物不代表證據等同。',refs:[6]},
{id:'q10',level:'basic',topic:'鎮靜藥安全',branch:'medication',stem:'病人已長期使用benzodiazepine，最適切的說明是？',options:['增加劑量是PTSD標準治療','不建議用於PTSD，但須另訂既有用藥的安全漸減計畫','今天全部停光且不用監測','改用cannabis即可'],answer:1,explain:'不推薦治療PTSD，不表示既有長期用藥可以突然停用；須評估依賴、戒斷與個別漸減安排。',refs:[1,6]},
{id:'q11',level:'advanced',topic:'透析用藥',branch:'special',stem:'血液透析成人考慮venlafaxine XR，所引仿單的正確原則是？',options:['直接套用一般高劑量','透析後一律補足原日劑量','總日劑量減少至少50%，核對製劑並個別化','腎功能完全不影響劑量'],answer:2,explain:'血液透析或CrCl<30者，所引XR仿單建議總日劑量減少至少50%；不可自行套用一般劑量或補量。',refs:[9]},
{id:'q12',level:'advanced',topic:'肝功能調整',branch:'special',stem:'成人Child-Pugh A（5–6分），考慮sertraline。何者符合所引仿單？',options:['由200mg直接開始','只調整最高劑量、不調整起始','輕度與重度肝病原則相同','起始與治療範圍均採一般劑量一半'],answer:3,explain:'輕度肝病採一般起始與治療範圍一半；中重度肝病不建議使用，須由專科另行規劃。',refs:[7]},
{id:'q13',level:'advanced',topic:'惡夢與低血壓',branch:'medication',stem:'透析病人反覆惡夢、血壓低且站立頭暈，關於prazosin最適切的是？',options:['立即高劑量起始','先評估低血壓、跌倒及交互作用，不自動推薦','可取代全部PTSD核心治療','不用追蹤血壓'],answer:1,explain:'Prazosin只討論PTSD相關惡夢，不是整體PTSD單方；首劑暈厥及姿勢性低血壓風險須審慎評估。',refs:[1,6]},
{id:'q14',level:'advanced',topic:'雙相疑慮',branch:'special',stem:'病人曾有睡很少仍精力旺盛、活動明顯增加的發作，現在希望先用抗憂鬱劑。下一步是？',options:['忽略既往發作，直接單方加至最高劑量','PCL-5高分可排除雙相','先評估躁症／輕躁症及雙相疑慮，轉精神科規劃','所有失眠都直接確診躁症'],answer:2,explain:'既往發作須完整評估；有雙相風險不能直接套用抗憂鬱劑單方，應先處理鑑別及情緒穩定。',refs:[6]},
{id:'q15',level:'advanced',topic:'兒少照護',branch:'special',stem:'15歲青少年創傷症狀持續3個月，最適切的照護原則是？',options:['照搬成人量表界線與處方','直接用成人最高劑量','不需評估受暴或照顧者支持','兒少專科評估、保護需求及年齡適切創傷焦點治療'],answer:3,explain:'使用年齡適切評估及家庭支持；NICE不建議以藥物預防或治療未滿18歲者的PTSD。',refs:[2]},
{id:'q16',level:'advanced',topic:'延遲症狀',branch:'early',stem:'創傷在8個月前，最近兩週才出現症狀。哪個說法最正確？',options:['釐清延遲出現、新事件及其他原因，不單憑症狀短診斷ASD','必定是ASD','事件超過一個月就可忽略症狀時間','一定與原創傷無關'],answer:0,explain:'事件與症狀時間不同；ASD與創傷後近期時窗相關。PTSD仍須症狀超過1個月及其餘條件。',refs:[1,3]},
{id:'q17',level:'advanced',topic:'安全優先',branch:'followup',stem:'PCL-5從50降至35，但本次出現明確自傷意圖，應如何決策？',options:['下降15分，宣布治癒','先啟動緊急安全評估，不以改善抵銷危險','只看分數即可延長回診間隔','自行停光所有藥物'],answer:1,explain:'下降至少10分可作反應訊號，不等同緩解，更不能抵銷急迫危險；安全與功能須另行評估。',refs:[1,4]},
{id:'q18',level:'advanced',topic:'反應不佳',branch:'followup',stem:'治療8週改善有限，但服藥不規則、心理治療多次缺席。最適切的下一步是？',options:['判定所有實證療法無效','自動疊加抗精神病藥','核對障礙、依從性、足夠劑量與療程品質，再共同調整','依單次分數永久停藥'],answer:2,explain:'先確認充分治療，處理可近性、副作用等障礙。8週為本工具回顧提醒，非所有療法固定失敗門檻。',refs:[1]},
{id:'q19',level:'advanced',topic:'物質使用共病',branch:'special',stem:'PTSD合併酒精使用障礙，沒有急性中毒或戒斷。關於創傷治療何者適切？',options:['永久排除創傷焦點治療','只處理酒精，永不再評估PTSD','完全忽略酒精風險','協同評估及照護，不因共病一概排除實證治療'],answer:3,explain:'共病納入整合照護；若出現急性中毒、戒斷或無法確保安全，先處理急迫問題。',refs:[1,5]},
{id:'q20',level:'advanced',topic:'共同決策',branch:'psychotherapy',stem:'病人問「心理治療加藥一定更好嗎？」最適切的回答是？',options:['依偏好與共病可並用，但不能保證常規合併一定更有效','所有人都必須並用','心理治療完全沒有證據','並用就不必監測副作用'],answer:0,explain:'特定心理與藥物治療有實證，但合併優於單一實證療法的證據仍不足，須共同決策並追蹤。',refs:[5,6]}
];
const branch=(id,title,description,nav,groups)=>({id,title,description,nav,children:groups.map(([gid,name,items,refs])=>({id:gid,title:name,refs,children:items.map(([t,body],i)=>({id:gid+'-'+i,title:t,body}))}))});
const tree=[
branch('safety','01 安全與創傷知情照護','先安全，再進入診斷與治療。',0,[
['safety-risk','辨識急迫風險',[
['自傷／傷人','詢問想法、意圖、計畫、可取得的工具與過往行為。'],['無法確保安全','緊急評估、陪伴與院內危機流程。'],['急性失控','精神病、躁症、嚴重中毒或戒斷優先處置。']],[1]],
['safety-protect','保護與支持',[
['持續受暴','確認環境、住所、保護及社會資源。'],['支持系統','在同意與適當保密下連結可信任的人。'],['安全計畫','記錄警訊、求助步驟及提早就醫情況。']],[1,2]],
['safety-interview','創傷知情訪談',[
['先說明與同意','解釋目的，提供選擇及暫停的權利。'],['避免強迫細節','不以反覆揭露作為接受照護的條件。'],['生活需要與尊重','注意文化、語言、基本需要及隱私。']],[2]]]),
branch('diagnosis','02 正確建立診斷','完整條件與訪談，量表不能單獨確診。',1,[
['diagnosis-a','A：創傷暴露',[
['事件性質','實際／威脅死亡、嚴重傷害或性暴力。'],['暴露方式','親身、現場目睹、親近者的暴力／意外事件，或職務反覆暴露。'],['媒體暴露','一般非工作媒體觀看通常不構成條件A。']],[3]],
['diagnosis-clusters','B／C／D／E症狀群',[
['B 再體驗 ≥1','記憶、惡夢、閃回或線索相關反應。'],['C 逃避 ≥1','內在經驗或外在提醒物的逃避不能省略。'],['D 認知情緒 ≥2','負面信念、自責、情緒、興趣、疏離等改變。'],['E 警覺反應 ≥2','易怒、冒險、警戒、驚嚇、注意力或睡眠改變。']],[3]],
['diagnosis-fgh','時間、功能與排除',[
['F 超過1個月','症狀持續時間與距事件時間分開確認。'],['G 痛苦／受損','臨床顯著痛苦或社交、工作等功能影響。'],['H 排除解釋','物質、藥物、身體及其他精神疾病須鑑別。']],[3]],
['diagnosis-measures','量測與確認',[
['PCL-5 0–80分','篩檢及變化；31–33分為依族群調整的參考。'],['CAPS-5','必要時由受訓人員進行標準化訪談。'],['未評估不等於陰性','補齊缺漏，不自行推定確診。']],[4]]]),
branch('early','03 急性與延遲出現的症狀','短期症狀不一律等於ASD或PTSD。',1,[
['early-time','確認時間軸',[
['未滿3天','早期反應評估、支持與安全照護。'],['3天至1個月','近期事件後評估ASD，採不同診斷規則。'],['舊事件、新症狀','釐清延遲出現及新創傷，不單憑症狀短診斷ASD。']],[1,3]],
['early-action','早期照護選擇',[
['心理急救','依需要提供生活及實際支持。'],['ASD／明顯症狀','評估創傷焦點CBT及專業轉介。'],['亞閾值症狀','主動監測，安排1個月內聯繫，惡化提早。']],[1,2]],
['early-avoid','避免不當預防',[
['不常規給藥預防','不是所有創傷暴露者都需藥物。'],['不使用心理debriefing','不常規以單次強迫詳述事件預防PTSD。']],[2]]]),
branch('psychotherapy','04 心理治療與共同決策','優先討論受訓人員提供的實證治療。',2,[
['psychotherapy-modalities','主要實證選項',[
['CPT','處理創傷相關信念、自責與意義。'],['PE','有規劃地接近安全但逃避的情境及記憶。'],['EMDR','依手冊處理目標記憶並搭配雙側刺激。']],[5]],
['psychotherapy-match','選擇適合的模式',[
['偏好與負擔','討論目標、時間、練習及既往反應。'],['可近性與訓練','確認治療師能力、監督及服務可近性。'],['無法取得時','轉介或適當遠距服務；討論其他手冊化療法或藥物。']],[5]],
['psychotherapy-combined','並用與調整',[
['並用的證據限制','依需要共同使用，不能保證一定優於單一治療。'],['療程未足','先核對出席、練習、節奏與障礙。']],[5,6]]]),
branch('medication','05 藥物與症狀治療','醫師確認、完整藥單與風險核對是前提。',2,[
['medication-options','具證據的選項',[
['Sertraline','一般PTSD起始25mg／日，依耐受性調整並核對品項。'],['Paroxetine（速放）','核對製劑上限、停藥反應與高齡風險。'],['Venlafaxine XR','核對血壓、腎肝功能、製劑上限及仿單外用途。']],[6,7,8,9]],
['medication-safety','起始與調整前',[
['雙相及周產期','評估躁症史、懷孕、備孕與哺乳。'],['交互作用','核對MAOI、linezolid、methylene blue及其他血清素藥物。'],['監測與停藥','注意低血鈉、出血、躁化與停藥症狀，不自行突然停藥。']],[6,7,8,9]],
['medication-nightmares','惡夢與不推薦治療',[
['Prazosin只針對惡夢','不是整體PTSD核心症狀的單方。'],['低血壓與暈厥','評估姿勢性症狀、跌倒及合併降壓藥。'],['Benzodiazepine／cannabis','不推薦治療PTSD；既有鎮靜藥另訂安全漸減。']],[1,6]]]),
branch('special','06 特殊族群與共病','依族群、器官功能及共病調整。',2,[
['special-renal','腎病、透析與高齡',[
['Sertraline與腎功能','通常不因腎功能不全調整，仍看共病及耐受性。'],['Venlafaxine與透析','血液透析或CrCl<30，所引XR仿單建議總日劑量減少至少50%。'],['高齡風險','低血鈉、出血、跌倒、抗膽鹼作用及多重用藥。']],[7,8,9]],
['special-liver','肝病與周產期',[
['輕度肝病與sertraline','Child-Pugh A：起始及治療範圍採一半。'],['中重度肝病','不建議sertraline，其他選項由專科與藥師核對。'],['懷孕／哺乳','權衡母嬰風險與既往反應，不套用一般自動處方。']],[6,7]],
['special-psychiatry','兒少與精神共病',[
['未滿18歲','年齡適切評估與創傷焦點治療；NICE不建議藥物預防／治療PTSD。'],['雙相疑慮','先專科評估，不直接抗憂鬱劑單方。'],['物質使用','協同治療，不一概排除創傷治療，急性戒斷先處理。'],['解離／複雜創傷','調整節奏與評估複雜性PTSD，不由單一問卷推定。']],[1,2,5,6]]]),
branch('followup','07 追蹤、反應與惡化','同一版本、相關事件與回顧期間。',3,[
['followup-baseline','建立可比較的基準',[
['多面向量測','症狀、功能、惡夢、安全、副作用及共同目標。'],['量表一致','固定版本、事件與回顧期間，未測量不可填0。'],['兒少另訂追蹤','不以成人PCL-5門檻自動判讀兒少。']],[2,4]],
['followup-interpret','解讀變化',[
['下降至少10分','反應訊號，不等於緩解或治癒。'],['改善但仍有危險','自傷意圖及嚴重不良反應仍優先處理。'],['症狀／功能惡化','提早回診，核對新威脅、診斷、共病與負擔。']],[1,4]],
['followup-review','門診回顧流程',[
['起始／改藥後','本工具建議1–2週先看安全與耐受性，高風險更早。'],['治療期間','本工具建議每2–4週評估，可依個案調整。'],['反應有限','確認足夠劑量、時間、依從性與心理治療品質再調整。']],[1]]]),
branch('recovery','08 復原、轉介與資料照護','支持功能復原，準備復發時的應對。',3,[
['recovery-goals','生活目標與轉介',[
['具體目標','例如恢復搭車回診、工作或重要人際活動。'],['殘餘症狀','另看失眠、疼痛、情緒及物質使用需求。'],['專科轉介','診斷複雜、嚴重共病或充分治療仍無效時會診。']],[1,2]],
['recovery-relapse','復發預防',[
['早期警訊','記錄壓力事件、症狀及功能改變。'],['求助計畫','支持資源、危機應對及提早回診方式。'],['減藥共同決策','依病史、復發及停藥風險安排，不依單一分數停藥。']],[1,2,7,8,9]],
['recovery-tool','使用本工具',[
['不輸入識別資料','一次一份評估，換人使用新評估／清除。'],['本機保留為選用','僅在瀏覽器處理，共用電腦不宜留存。'],['匯出妥善保管','本機續存不是醫療資訊系統或跨裝置備份。']],[]]])
];
function grade(answers){const missing=questions.map((q,i)=>Number.isInteger(answers[i])&&answers[i]>=0&&answers[i]<q.options.length?-1:i).filter(i=>i>=0),correct=questions.filter((q,i)=>answers[i]===q.answer).length;return {complete:!missing.length,answered:questions.length-missing.length,missing,correct,percent:missing.length?null:Math.round(correct/questions.length*100)};}
const pitfalls={
'safety-risk':'只問「有沒有想死」，未問計畫、工具與過往行為，會低估風險。',
'safety-protect':'在加害者可能在場時詢問受暴，或未經同意聯絡家屬。',
'safety-interview':'為了確診而要求病人反覆詳述創傷細節。',
'diagnosis-a':'以事件名稱（如車禍）直接認定符合條件A，或把一般媒體觀看算入。',
'diagnosis-clusters':'總分很高就忽略缺少的C群逃避症狀。',
'diagnosis-fgh':'把「距事件時間」當成「症狀持續時間」。',
'diagnosis-measures':'未評估的項目當作陰性，或以PCL-5單獨確診。',
'early-time':'舊創傷近期出現症狀就直接套用ASD。',
'early-action':'事件後立即要求所有人詳述經過，或未安排後續聯繫。',
'early-avoid':'常規開立藥物（含benzodiazepine）「預防」PTSD。',
'psychotherapy-modalities':'宣稱某一種療法對所有人必然最佳。',
'psychotherapy-match':'因等候時間長就放棄實證心理治療，未討論轉介或遠距。',
'psychotherapy-combined':'出席或練習不足時就判定治療無效。',
'medication-options':'把三個比較選項合併使用，或跨製劑套用劑量上限。',
'medication-safety':'未問躁症史、懷孕及交互作用即開始SSRI／SNRI。',
'medication-nightmares':'把prazosin當成PTSD整體治療，或對低血壓者常規使用。',
'special-renal':'血液透析病人以一般劑量開始venlafaxine。',
'special-liver':'中重度肝病仍套用sertraline一般劑量。',
'special-psychiatry':'對兒少套用成人PCL-5門檻或成人劑量。',
'followup-baseline':'更換量表版本或回顧期間後直接比較分數。',
'followup-interpret':'分數下降就忽略新出現的自傷意圖。',
'followup-review':'開始用藥後等到8–12週才第一次回診。',
'recovery-goals':'只追分數，未追功能與病人自訂目標。',
'recovery-relapse':'分數一低就突然停藥。',
'recovery-tool':'在共用電腦勾選本機保留或輸入病歷號。'};
const caseBranches=[['diagnosis-clusters','psychotherapy-modalities'],['early-time','early-action'],['special-renal','medication-options'],['medication-nightmares','special-renal'],['safety-risk'],['special-psychiatry','safety-protect'],['special-psychiatry','medication-safety'],['diagnosis-clusters','diagnosis-measures'],['special-liver','medication-safety'],['special-liver'],['medication-options'],['special-psychiatry','psychotherapy-combined'],['followup-review','medication-nightmares','recovery-goals'],['safety-protect'],['diagnosis-fgh'],['early-time']];
tree.forEach(r=>r.children.forEach(c=>{c.pitfall=pitfalls[c.id];c.cases=caseBranches.map((b,i)=>b.includes(c.id)?i:-1).filter(i=>i>=0);}));
const synonyms=[['腎','透析','crcl','dialysis'],['惡夢','nightmare','prazosin','睡眠'],['自殺','suicide','自傷','安全計畫'],['兒少','兒童','青少年','child','未滿18歲'],['懷孕','pregnancy','哺乳','周產期','備孕'],['肝','child-pugh','liver'],['ssri','sertraline','paroxetine'],['snri','venlafaxine'],['血壓','低血壓','暈厥','姿勢性'],['酒','alcohol','物質'],['解離','dissociation','複雜創傷'],['量表','pcl-5','caps-5'],['急性壓力','asd','3天至1個月'],['家暴','受暴','暴力'],['心理治療','cpt','pe','emdr'],['停藥','減藥','停藥症狀']];
const expandTerm=t=>{const set=new Set([t]);synonyms.forEach(g=>{if(g.includes(t))g.forEach(x=>set.add(x));});return [...set];};
const searchTerms=query=>String(query||'').toLocaleLowerCase().split(/[\s,，、;；]+/).filter(Boolean);
function filterTree(nodes,query){const terms=searchTerms(query).map(expandTerm);if(!terms.length)return nodes;const text=n=>[n.title,n.description,n.body,n.pitfall].filter(Boolean).join(' ').toLocaleLowerCase();const prune=(n,context)=>{const own=context+' '+text(n);if(terms.every(alts=>alts.some(t=>own.includes(t))))return n;const children=(n.children||[]).map(c=>prune(c,own)).filter(Boolean);return children.length?{...n,children}:null;};return nodes.map(n=>prune(n,'')).filter(Boolean);}
function relevance(s,code,recordCount){const r={},add=(id,why)=>{(r[id]=r[id]||[]).push(why);};if(!s)return r;
if(['imminent','violence','withdrawal'].includes(s.risk))add('safety-risk','目前有急迫風險');if(s.risk==='ideation')add('safety-risk','有自傷想法');if(s.risk==='unsafe')add('safety-protect','環境不安全／持續受暴');
if(code==='acute'){add('early-time','症狀未滿1個月或時間待釐清');add('early-action','早期照護選擇');}
if(code==='subthreshold')add('diagnosis-clusters','症狀群或功能未達條件');if(code==='differential')add('diagnosis-fgh','其他原因尚未排除');if(code==='incomplete'&&s.risk&&s.age&&!['child','young'].includes(s.age))add('diagnosis-measures','評估資料尚未完整');
if(code==='child'||['child','young'].includes(s.age))add('special-psychiatry','兒少個案');if(s.bipolar==='yes')add('special-psychiatry','疑似雙相');if((s.comorbid||[]).some(x=>['substance','dissociation'].includes(x)))add('special-psychiatry','物質使用或解離共病');
if(['moderate','severe','dialysis'].includes(s.renal))add('special-renal','腎功能下降／透析');if(s.age==='older')add('special-renal','65歲以上');
if(['mild','moderate','severe'].includes(s.liver))add('special-liver','肝功能不全');if(s.pregnant==='yes')add('special-liver','懷孕／備孕／哺乳');
if(s.nightmares==='yes')add('medication-nightmares','持續惡夢');if(s.bp==='low'||s.orthostasis==='yes')add('medication-nightmares','低血壓／姿勢性症狀');
if(['med','combined'].includes(s.preference)&&code==='probable'){add('medication-options','偏好討論藥物');add('medication-safety','用藥前安全核對');}if(s.bp==='high'&&s.med==='venlafaxine')add('medication-options','未控制高血壓＋venlafaxine');
if(code==='probable'&&['therapy','undecided','combined'].includes(s.preference))add('psychotherapy-match','共同選擇心理治療');if(s.access==='no')add('psychotherapy-match','心理治療可近性不足');
if(['failed','partial'].includes(s.prior)){add('followup-review','既往治療反應不佳');add('psychotherapy-combined','療程與反應需檢視');}
if(recordCount)add('followup-interpret','已有'+recordCount+'筆追蹤紀錄');return r;}
function wrongByBranch(answers){const r={};questions.forEach((q,i)=>{if(answers[i]!==q.answer)(r[q.branch]=r[q.branch]||[]).push(i);});return r;}
const countLeaves=nodes=>nodes.reduce((n,a)=>n+(a.children?countLeaves(a.children):1),0);
const api={questions,tree,grade,filterTree,countLeaves,searchTerms,expandTerm,pitfalls,caseBranches,relevance,wrongByBranch};root.PTSDLearning=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
