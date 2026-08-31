/* oxlint-disable react/only-export-components */
import { ArrowRight, BedDouble, CalendarDays, Check, Footprints, MapPin, Mountain, Route, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const kilimanjaroRoutes = [
  {
    key: 'marangu',
    number: '01',
    name: 'Marangu',
    label: 'The hut route',
    duration: '6 days preferred',
    distance: '~72 km return',
    gate: 'Marangu Gate',
    finish: 'Marangu Gate',
    sleep: 'Permanent huts',
    character: 'Gradual underfoot',
    route: 'Mandara · Horombo · Kibo · Uhuru Peak',
    bestFor: 'Huts and a familiar line',
    note: 'The five-day version is quick for altitude. We lead with six days and a Horombo acclimatisation day.',
    copy: 'A steady south-eastern approach with a bed in a mountain hut each night. You climb and descend the same trail, so the comfort is real but the scenery changes less.',
    accent: 'ochre',
  },
  {
    key: 'machame',
    number: '02',
    name: 'Machame',
    label: 'The scenic traverse',
    duration: '7 days preferred',
    distance: '~62 km',
    gate: 'Machame Gate',
    finish: 'Mweka Gate',
    sleep: 'Mountain camps',
    character: 'Varied and steep',
    route: 'Machame · Shira · Lava Tower · Barranco · Barafu',
    bestFor: 'Big scenery and a fresh descent',
    note: 'The seven-day line keeps Karanga in the plan. Barranco is a guided scramble, not a technical climbing pitch.',
    copy: 'Move through rainforest, moorland, alpine desert and the southern summit route before descending through a different forest. It is the classic choice for a visual sense of the whole mountain.',
    accent: 'forest',
  },
  {
    key: 'lemosho',
    number: '03',
    name: 'Lemosho',
    label: 'The slow western build',
    duration: '7–8 days preferred',
    distance: '~70 km',
    gate: 'Londorossi Gate',
    finish: 'Mweka Gate',
    sleep: 'Mountain camps',
    character: 'Best acclimatisation',
    route: 'Forest · Shira Plateau · Lava Tower · Barranco · Barafu',
    bestFor: 'First-time climbers who want time',
    note: 'The full lower start is the better beginner offer. High Shira drop-offs are a different altitude proposition.',
    copy: 'Start lower on the western side and let the mountain rise around you. The longer approach earns its place with quieter trail days, broad Shira views and a calmer altitude build.',
    accent: 'sage',
  },
  {
    key: 'rongai',
    number: '04',
    name: 'Rongai',
    label: 'The quiet north',
    duration: '7 days preferred',
    distance: '~74 km',
    gate: 'Nalemuru / Rongai Gate',
    finish: 'Marangu Gate',
    sleep: 'Mountain camps',
    character: 'Drier and quieter',
    route: 'Simba · Kikilewa · Mawenzi Tarn · Kibo · Uhuru Peak',
    bestFor: 'A different side of Kibo',
    note: 'The northern slope can be drier and quieter, but the summit day is still long. Keep a full acclimatisation day.',
    copy: 'Approach from the Kenyan side of the mountain, pass beneath Mawenzi and come down through Marangu. The route gives you two faces of Kilimanjaro in one climb.',
    accent: 'clay',
  },
  {
    key: 'northern-circuit',
    number: '05',
    name: 'Northern Circuit',
    label: 'The long way around Kibo',
    duration: '8–9 days',
    distance: '~98 km',
    gate: 'Londorossi Gate',
    finish: 'Mweka Gate',
    sleep: 'Mountain camps',
    character: 'Longest and quietest',
    route: 'Shira · Moir · Buffalo · 3rd Cave · School Hut · Uhuru Peak',
    bestFor: 'Time, silence and altitude margin',
    note: 'Extra nights help acclimatisation, but the accumulated walking still demands good conditioning.',
    copy: 'Circle the northern slopes before joining the summit line. It is the most complete mountain route, with long open stretches and fewer busy trail sections.',
    accent: 'slate',
  },
  {
    key: 'umbwe',
    number: '06',
    name: 'Umbwe',
    label: 'The direct ridge',
    duration: '7 days preferred',
    distance: '~53 km',
    gate: 'Umbwe Gate',
    finish: 'Mweka Gate',
    sleep: 'Mountain camps',
    character: 'Steep and direct',
    route: 'Umbwe Ridge · Barranco · Karanga · Barafu · Uhuru Peak',
    bestFor: 'Experienced hikers',
    note: 'The first two days are steep. The six-day version is for trekkers with strong recent hiking or altitude experience.',
    copy: 'Take a quiet rainforest ridge straight toward the southern trail. Umbwe feels bold from the first step, then joins the Barranco line for the summit approach.',
    accent: 'terracotta',
  },
  {
    key: 'shira',
    number: '07',
    name: 'Shira Plateau',
    label: 'The high-start variant',
    duration: '7–8 days',
    distance: '~56 km',
    gate: 'Londorossi / Shira Barrier',
    finish: 'Mweka Gate',
    sleep: 'Mountain camps',
    character: 'High and open',
    route: 'Shira Barrier · Shira 2 · Lava Tower · Barranco · Barafu',
    bestFor: 'Experienced or pre-acclimatised trekkers',
    note: 'The trail starts around 3,595 m. It is not a shorter, easier Lemosho; screen for altitude experience first.',
    copy: 'Walk across the oldest volcanic landscape on the mountain, then join the Lava Tower and Barranco line. The views arrive early, as does the altitude.',
    accent: 'gold',
  },
];

export const routeDays = {
  marangu: [
    { label: 'Day 1', title: 'Marangu Gate to Mandara Hut', location: 'Marangu Gate → Mandara Hut', altitude: '1,860 m → 2,720 m', stay: 'Mandara Hut', detail: 'Complete registration at the gate, then walk into the rainforest beneath tall cedars and moss. The path is steady and shaded, with the first mountain camp reached before dark.', note: 'Rainforest trail · about 8 km · 4–5 hours' },
    { label: 'Day 2', title: 'Mandara Hut to Horombo Hut', location: 'Mandara → Horombo', altitude: '2,720 m → 3,720 m', stay: 'Horombo Hut', detail: 'Leave the forest for open heath and moorland. A short detour to Maundi Crater gives wide views across the eastern side of the mountain before the trail continues to Horombo.', note: 'Maundi Crater option · about 12 km · 6–8 hours' },
    { label: 'Day 3', title: 'Horombo acclimatisation day', location: 'Horombo Hut', altitude: '3,720 m', stay: 'Horombo Hut', detail: 'Keep the day deliberately light. Walk toward Zebra Rocks or the Mawenzi viewpoint, eat well and return to the hut with time to rest. This day is why we recommend six days over five.', note: 'Easy acclimatisation walk · sleep at the same altitude' },
    { label: 'Day 4', title: 'Horombo Hut to Kibo Hut', location: 'Horombo → Kibo', altitude: '3,720 m → 4,703 m', stay: 'Kibo Hut', detail: 'Cross the high saddle between Mawenzi and Kibo. Vegetation thins into alpine desert, so the pace slows and water becomes part of the plan. Arrive early for food and a long rest before the summit start.', note: 'Alpine desert · about 10 km · 6–8 hours' },
    { label: 'Day 5', title: 'Kibo summit and return to Horombo', location: 'Kibo → Gilman\'s Point → Uhuru Peak → Horombo', altitude: '4,703 m → 5,895 m → 3,720 m', stay: 'Horombo Hut', detail: 'Start around midnight for the steep climb across scree to Gilman\'s Point and the crater rim. Continue along the rim to Uhuru Peak, then descend to Kibo for a short break and on to Horombo.', note: 'Summit day · about 22 km · 12–15 hours' },
    { label: 'Day 6', title: 'Horombo Hut to Marangu Gate', location: 'Horombo → Marangu Gate', altitude: '3,720 m → 1,860 m', stay: 'Departure or Moshi hotel', detail: 'Descend through moorland and rainforest to the gate. Sign out, collect your summit certificate and meet your transfer back to Moshi or the next part of your Tanzania trip.', note: 'Descent · about 20 km · 6–8 hours' },
  ],
  machame: [
    { label: 'Day 1', title: 'Machame Gate to Machame Camp', location: 'Machame Gate → Machame Camp', altitude: '1,800 m → 3,000 m', stay: 'Machame Camp', detail: 'After registration, enter the rainforest and follow a root-lined trail up the southern shoulder. The crew walks at a measured pace while camp is prepared ahead of you.', note: 'Rainforest · about 11 km · 5–7 hours' },
    { label: 'Day 2', title: 'Machame Camp to Shira Camp', location: 'Machame Camp → Shira Plateau', altitude: '3,000 m → 3,840 m', stay: 'Shira Camp', detail: 'The forest gives way to heather and open moorland. Cross into the Shira Plateau with views toward Kibo, then settle into camp while the light changes across the caldera.', note: 'Moorland · about 9 km · 4–6 hours' },
    { label: 'Day 3', title: 'Shira to Lava Tower, then Barranco', location: 'Shira Plateau → Lava Tower → Barranco', altitude: '3,840 m → 4,630 m → 3,960 m', stay: 'Barranco Camp', detail: 'Climb toward Lava Tower to spend time higher, then descend to Barranco. This up-and-down profile helps the body adapt and brings the first view of the Barranco Wall.', note: 'Acclimatisation day · about 12 km · 6–8 hours' },
    { label: 'Day 4', title: 'Barranco Wall to Karanga Camp', location: 'Barranco → Karanga Valley', altitude: '3,960 m → 4,035 m', stay: 'Karanga Camp', detail: 'Use hands and feet on the guided scramble up Barranco Wall, then cross the Karanga Valley on a shorter afternoon. There is time to rest before the higher camps.', note: 'Scramble and valley crossing · about 7 km · 4–5 hours' },
    { label: 'Day 5', title: 'Karanga Camp to Barafu Camp', location: 'Karanga → Barafu', altitude: '4,035 m → 4,640 m', stay: 'Barafu Camp', detail: 'A short, focused climb reaches the final camp. Eat early, organise your summit layers and sleep as much as the altitude allows before the night departure.', note: 'High camp · about 6 km · 4–5 hours' },
    { label: 'Day 6', title: 'Summit night and descent to Mweka', location: 'Barafu → Uhuru Peak → Mweka', altitude: '4,640 m → 5,895 m → 3,100 m', stay: 'Mweka Camp', detail: 'Begin before midnight and climb slowly to the crater rim. Continue to Uhuru Peak for sunrise, then descend through alpine desert and heath to Mweka Camp for a well-earned rest.', note: 'Summit day · about 17 km · 12–15 hours' },
    { label: 'Day 7', title: 'Mweka Camp to Mweka Gate', location: 'Mweka Camp → Mweka Gate', altitude: '3,100 m → 1,640 m', stay: 'Departure or Moshi hotel', detail: 'Finish through the rainforest, sign out at Mweka Gate and collect your certificate. Your transfer back to Moshi can continue to a safari or a quieter recovery day.', note: 'Rainforest descent · about 10 km · 3–5 hours' },
  ],
  lemosho: [
    { label: 'Day 1', title: 'Londorossi Gate to Mti Mkubwa', location: 'Londorossi Gate → Mti Mkubwa', altitude: '2,100 m → 2,780 m', stay: 'Mti Mkubwa Camp', detail: 'Complete the western gate formalities, then walk into a quieter stretch of rainforest. The lower start lets the first day feel like a walk, not an altitude test.', note: 'Forest approach · about 6 km · 3–4 hours' },
    { label: 'Day 2', title: 'Mti Mkubwa to Shira 1', location: 'Mti Mkubwa → Shira 1', altitude: '2,780 m → 3,500 m', stay: 'Shira 1 Camp', detail: 'Leave the forest for heather and moorland as the trail rises onto the Shira Plateau. Kibo appears across the open volcanic plain when the cloud clears.', note: 'Moorland · about 8 km · 5–7 hours' },
    { label: 'Day 3', title: 'Shira Plateau traverse', location: 'Shira 1 → Shira 2', altitude: '3,500 m → 3,900 m', stay: 'Shira 2 Camp', detail: 'Walk across the plateau with a gentle gain in height. A short acclimatisation walk toward the Shira Cathedral area can be added if the guide and weather agree.', note: 'Open plateau · about 10 km · 5–7 hours' },
    { label: 'Day 4', title: 'Shira 2 to Moir or Lava Tower', location: 'Shira 2 → Moir Valley / Lava Tower', altitude: '3,900 m → 4,200–4,630 m', stay: 'Moir or Lava Tower camp', detail: 'Move east across volcanic terrain and spend time above the next camp altitude before descending toward the southern trail. The guide uses the selected camp allocation to keep the profile steady.', note: 'High acclimatisation day · about 9 km · 5–7 hours' },
    { label: 'Day 5', title: 'Lava Tower to Barranco Camp', location: 'Lava Tower → Barranco', altitude: '4,630 m → 3,960 m', stay: 'Barranco Camp', detail: 'Climb to the Lava Tower area, then descend into the Barranco Valley. The drop at the end of the day helps you sleep lower after spending time high.', note: 'Up and down profile · about 10 km · 6–8 hours' },
    { label: 'Day 6', title: 'Barranco Wall to Karanga Camp', location: 'Barranco → Karanga Valley', altitude: '3,960 m → 4,035 m', stay: 'Karanga Camp', detail: 'Scramble with your guide up Barranco Wall, cross the valley and settle into a shorter afternoon. The mountain feels more alpine here, with Kibo filling the horizon.', note: 'Scramble and valley crossing · about 7 km · 4–5 hours' },
    { label: 'Day 7', title: 'Karanga to Barafu Camp', location: 'Karanga → Barafu', altitude: '4,035 m → 4,640 m', stay: 'Barafu Camp', detail: 'Reach the final camp at a controlled pace. Your crew checks layers, headlamp, water and summit snacks before you rest for the overnight departure.', note: 'High camp · about 6 km · 4–5 hours' },
    { label: 'Day 8', title: 'Uhuru Peak and Mweka descent', location: 'Barafu → Uhuru Peak → Mweka', altitude: '4,640 m → 5,895 m → 3,100 m', stay: 'Mweka Camp or gate, according to allocation', detail: 'Climb before dawn to the crater rim and continue to Uhuru Peak. Descend through the upper zones to Mweka, with the final gate transfer confirmed around the crew and park schedule.', note: 'Summit and long descent · about 17 km · 12–15 hours' },
  ],
  rongai: [
    { label: 'Day 1', title: 'Nalemuru Gate to Simba Camp', location: 'Nalemuru / Rongai Gate → Simba', altitude: '2,020 m → 2,625 m', stay: 'Simba Camp', detail: 'Enter from the northern slope near the Kenya border and walk through a quieter, drier forest. The opening is gentle, with wide views appearing as the trees thin.', note: 'Northern forest · about 8 km · 4 hours' },
    { label: 'Day 2', title: 'Simba to Second Cave', location: 'Simba → Second Cave', altitude: '2,625 m → 3,450 m', stay: 'Second Cave Camp', detail: 'Continue across heather and open country beneath Kibo. Walk slowly, drink regularly and let the northern approach settle you into the mountain rhythm.', note: 'Moorland · about 8 km · 6–7 hours' },
    { label: 'Day 3', title: 'Second Cave to Kikelewa Camp', location: 'Second Cave → Kikelewa', altitude: '3,450 m → 3,630 m', stay: 'Kikelewa Camp', detail: 'Leave the main northern line for a more open trail toward Mawenzi. The shorter distance makes this a useful day for watching how your body responds to altitude.', note: 'Open moorland · about 5 km · 4–5 hours' },
    { label: 'Day 4', title: 'Kikelewa to Mawenzi Tarn', location: 'Kikelewa → Mawenzi Tarn', altitude: '3,630 m → 4,330 m', stay: 'Mawenzi Tarn Camp', detail: 'Climb into the bowl beneath Mawenzi, Kilimanjaro\'s second cone. The jagged rock walls and changing light make this one of the most distinctive camps on the mountain.', note: 'Mawenzi views · about 8 km · 4–5 hours' },
    { label: 'Day 5', title: 'Mawenzi Tarn to Kibo Hut', location: 'Mawenzi Tarn → Kibo', altitude: '4,330 m → 4,703 m', stay: 'Kibo Hut', detail: 'Cross the broad saddle toward Kibo with no shade and little vegetation. Arrive early, prepare your summit kit and rest before the midnight start.', note: 'Alpine desert · about 8 km · 5–6 hours' },
    { label: 'Day 6', title: 'Summit and descent to Horombo', location: 'Kibo → Uhuru Peak → Horombo', altitude: '4,703 m → 5,895 m → 3,720 m', stay: 'Horombo Hut', detail: 'Climb through the dark to Gilman\'s Point, follow the rim to Uhuru Peak and then descend on the southern side. A long day ends at Horombo with a lower sleeping altitude.', note: 'Summit day · about 22 km · 12–15 hours' },
    { label: 'Day 7', title: 'Horombo to Marangu Gate', location: 'Horombo → Marangu Gate', altitude: '3,720 m → 1,860 m', stay: 'Departure or Moshi hotel', detail: 'Descend through moorland and rainforest to Marangu Gate. Sign out, receive your certificate and connect back to Moshi or your next Tanzania itinerary.', note: 'Descent · about 20 km · 6–8 hours' },
  ],
  'northern-circuit': [
    { label: 'Day 1', title: 'Londorossi Gate to Mti Mkubwa', location: 'Londorossi Gate → Mti Mkubwa', altitude: '2,100 m → 2,780 m', stay: 'Mti Mkubwa Camp', detail: 'Start in the western rainforest after park registration. The trail is quiet and shaded, giving you a measured first day before the long northern arc begins.', note: 'Forest approach · about 6 km · 3–4 hours' },
    { label: 'Day 2', title: 'Mti Mkubwa to Shira 1', location: 'Mti Mkubwa → Shira 1', altitude: '2,780 m → 3,500 m', stay: 'Shira 1 Camp', detail: 'Climb out of the forest and onto the Shira Plateau. The open view of Kibo makes the mountain feel larger, while the lower start keeps the altitude gain gradual.', note: 'Moorland · about 8 km · 5–7 hours' },
    { label: 'Day 3', title: 'Shira 1 to Shira 2', location: 'Shira 1 → Shira 2', altitude: '3,500 m → 3,900 m', stay: 'Shira 2 Camp', detail: 'Traverse the plateau at a steady pace. A short walk toward the Shira Cathedral area can be used for acclimatisation when conditions and the camp plan allow.', note: 'Open plateau · about 10 km · 5–7 hours' },
    { label: 'Day 4', title: 'Shira 2 to Moir Hut', location: 'Shira 2 → Moir Valley', altitude: '3,900 m → 4,200 m', stay: 'Moir Hut Camp', detail: 'Leave the busy southern line and angle toward the quiet north-western side. The Moir Valley feels remote, with lava formations and a wide view back across the plateau.', note: 'High valley · about 11 km · 5–7 hours' },
    { label: 'Day 5', title: 'Moir Hut to Pofu or Buffalo Camp', location: 'Moir → Pofu / Buffalo', altitude: '4,200 m → 4,020 m', stay: 'Pofu or Buffalo Camp', detail: 'Walk across the northern circuit with Kibo on one side and the Kenya plains opening below. The route rises and falls gently, building time at altitude without a hard summit push.', note: 'Northern traverse · about 12 km · 6–7 hours' },
    { label: 'Day 6', title: 'Buffalo Camp to Third Cave', location: 'Buffalo → Third Cave', altitude: '4,020 m → 3,870 m', stay: 'Third Cave Camp', detail: 'Continue east along a quiet high route beneath the northern face. The shorter day leaves space to eat, hydrate and keep the legs fresh for the summit approach.', note: 'High traverse · about 8 km · 5–7 hours' },
    { label: 'Day 7', title: 'Third Cave to School Hut', location: 'Third Cave → School Hut', altitude: '3,870 m → 4,750 m', stay: 'School Hut Camp', detail: 'Turn south toward Kibo and climb to the final camp. The guide checks the weather, route condition and your readiness before the overnight summit start.', note: 'Final approach · about 10 km · 5–7 hours' },
    { label: 'Day 8', title: 'School Hut to Uhuru Peak and Mweka', location: 'School Hut → Uhuru Peak → Mweka', altitude: '4,750 m → 5,895 m → 3,100 m', stay: 'Mweka Camp', detail: 'Climb through the dark to the crater rim and continue to Uhuru Peak. Descend through the southern zones to Mweka for a lower, more restorative night.', note: 'Summit day · about 18 km · 12–15 hours' },
    { label: 'Day 9', title: 'Mweka Camp to Mweka Gate', location: 'Mweka Camp → Mweka Gate', altitude: '3,100 m → 1,640 m', stay: 'Departure or Moshi hotel', detail: 'Finish through the rainforest and sign out at Mweka Gate. Use the afternoon for recovery or connect directly to a safari, depending on your plan.', note: 'Rainforest descent · about 10 km · 3–5 hours' },
  ],
  umbwe: [
    { label: 'Day 1', title: 'Umbwe Gate to Umbwe Camp', location: 'Umbwe Gate → Umbwe Camp', altitude: '1,600 m → 2,850 m', stay: 'Umbwe Camp', detail: 'Enter a dense rainforest and follow the narrow ridge. The trail rises sharply from the start, so the guide sets a slow pace and watches footing on roots and wet ground.', note: 'Steep rainforest ridge · about 11 km · 5–7 hours' },
    { label: 'Day 2', title: 'Umbwe Camp to Barranco Camp', location: 'Umbwe → Barranco', altitude: '2,850 m → 3,960 m', stay: 'Barranco Camp', detail: 'The ridge becomes more exposed as the forest thins. Join the southern trail near Barranco and arrive with a full afternoon to eat, rest and review the next day\'s scramble.', note: 'Steep opening · about 6 km · 4–6 hours' },
    { label: 'Day 3', title: 'Barranco acclimatisation day', location: 'Barranco Valley', altitude: '3,960 m', stay: 'Barranco Camp', detail: 'Use a short walk toward the Lava Tower or upper valley to spend time higher, then return to camp. This extra day turns a direct route into a more responsible seven-day plan.', note: 'Acclimatisation walk · distance set by guide and conditions' },
    { label: 'Day 4', title: 'Barranco Wall to Karanga Camp', location: 'Barranco → Karanga Valley', altitude: '3,960 m → 4,035 m', stay: 'Karanga Camp', detail: 'Scramble up Barranco Wall with guide support, cross the valley and reach Karanga. The path is short but uneven, so the day is about controlled movement rather than speed.', note: 'Scramble and valley crossing · about 7 km · 4–5 hours' },
    { label: 'Day 5', title: 'Karanga to Barafu Camp', location: 'Karanga → Barafu', altitude: '4,035 m → 4,640 m', stay: 'Barafu Camp', detail: 'Climb through alpine desert to the final camp. After an early meal, organise the summit kit and rest for the night departure.', note: 'High camp · about 6 km · 4–5 hours' },
    { label: 'Day 6', title: 'Summit and descent to Millennium Camp', location: 'Barafu → Uhuru Peak → Millennium', altitude: '4,640 m → 5,895 m → 3,820 m', stay: 'Millennium Camp', detail: 'Start before midnight, reach the crater rim and continue to Uhuru Peak. Descend carefully through the upper mountain to Millennium Camp for a lower sleeping altitude.', note: 'Summit day · about 15 km · 12–15 hours' },
    { label: 'Day 7', title: 'Millennium Camp to Mweka Gate', location: 'Millennium → Mweka Gate', altitude: '3,820 m → 1,640 m', stay: 'Departure or Moshi hotel', detail: 'Finish through the rainforest and sign out at Mweka Gate. Your transfer can continue to Moshi, a recovery stay or the next part of your itinerary.', note: 'Long descent · about 12 km · 5–7 hours' },
  ],
  shira: [
    { label: 'Day 1', title: 'Shira Barrier to Simba Camp', location: 'Shira Barrier → Simba Camp', altitude: '3,595 m → 3,600 m', stay: 'Simba Camp', detail: 'Drive to the high Shira access point and walk across open volcanic ground. The first view is already alpine, which is also why the guide checks your response to altitude from the start.', note: 'High-start route · about 4 km · 2–3 hours' },
    { label: 'Day 2', title: 'Simba Camp to Shira 2', location: 'Simba → Shira 2', altitude: '3,600 m → 3,900 m', stay: 'Shira 2 Camp', detail: 'Cross the old Shira caldera through grassland and lava formations. Keep the pace easy and use the afternoon to rest at camp beneath the western face of Kibo.', note: 'Open plateau · about 8 km · 4–6 hours' },
    { label: 'Day 3', title: 'Shira Plateau acclimatisation walk', location: 'Shira 2 and Cathedral area', altitude: '3,900 m', stay: 'Shira 2 Camp', detail: 'Take a guided walk toward the Shira Cathedral area, then return to the same camp. The day adds time at altitude without moving your sleeping height too quickly.', note: 'Acclimatisation day · walk set by guide and conditions' },
    { label: 'Day 4', title: 'Shira 2 to Lava Tower and Barranco', location: 'Shira 2 → Lava Tower → Barranco', altitude: '3,900 m → 4,630 m → 3,960 m', stay: 'Barranco Camp', detail: 'Climb through alpine desert to Lava Tower, then descend into the Barranco Valley. The up-and-down profile is useful for acclimatisation and introduces the southern summit line.', note: 'Up and down profile · about 12 km · 6–8 hours' },
    { label: 'Day 5', title: 'Barranco Wall to Karanga Camp', location: 'Barranco → Karanga Valley', altitude: '3,960 m → 4,035 m', stay: 'Karanga Camp', detail: 'Scramble up Barranco Wall with your guide, cross the Karanga Valley and settle into a shorter afternoon. The route now follows the familiar southern approach.', note: 'Scramble and valley crossing · about 7 km · 4–5 hours' },
    { label: 'Day 6', title: 'Karanga to Barafu Camp', location: 'Karanga → Barafu', altitude: '4,035 m → 4,640 m', stay: 'Barafu Camp', detail: 'Reach the final camp on a short, focused climb. Eat early, prepare your layers and rest before the overnight summit attempt.', note: 'High camp · about 6 km · 4–5 hours' },
    { label: 'Day 7', title: 'Uhuru Peak and Mweka Camp', location: 'Barafu → Uhuru Peak → Mweka', altitude: '4,640 m → 5,895 m → 3,100 m', stay: 'Mweka Camp', detail: 'Climb before dawn to Uhuru Peak, then descend through the upper mountain to Mweka. The lower camp gives the body a better night before the final walk out.', note: 'Summit day · about 17 km · 12–15 hours' },
    { label: 'Day 8', title: 'Mweka Camp to Mweka Gate', location: 'Mweka Camp → Mweka Gate', altitude: '3,100 m → 1,640 m', stay: 'Departure or Moshi hotel', detail: 'Walk down through the rainforest and sign out at the gate. Connect to Moshi, a safari or a recovery day once the park formalities are complete.', note: 'Rainforest descent · about 10 km · 3–5 hours' },
  ],
};

const routeFacts = [
  { icon: Mountain, label: 'High point', value: 'Uhuru Peak · 5,895 m' },
  { icon: Footprints, label: 'Ecological zones', value: 'Forest to arctic summit' },
  { icon: ShieldCheck, label: 'Guiding', value: 'Licensed operator required' },
];

export default function Kilimanjaro() {
  return (
    <div className="page-enter kilimanjaro-page">
      <section className="kilimanjaro-hero" aria-labelledby="kilimanjaro-heading">
        <div className="kilimanjaro-hero-inner">
          <div className="kilimanjaro-hero-copy">
            <Link className="kilimanjaro-back-link" to="/itineraries"><ArrowRight aria-hidden="true" size={15} /> All itineraries</Link>
            <p className="eyebrow">Kilimanjaro routes</p>
            <h1 id="kilimanjaro-heading">Seven ways up Africa's highest mountain.</h1>
            <p>Every route reaches the same summit. The difference is how you get there: huts or camps, a quiet north or a long western build, a direct ridge or more time to acclimatise.</p>
            <div className="kilimanjaro-hero-actions">
              <a className="kilimanjaro-primary-action" href="#routes">Compare the routes <ArrowRight aria-hidden="true" size={16} /></a>
              <Link className="kilimanjaro-quiet-action" to="/enquire">Plan a climb <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
          </div>
          <aside className="kilimanjaro-hero-card" aria-label="Kilimanjaro facts">
            <div className="kilimanjaro-hero-icon"><Mountain aria-hidden="true" size={23} /></div>
            <p className="eyebrow">The mountain in one line</p>
            <h2>Choose your pace before you choose your route.</h2>
            <div className="kilimanjaro-hero-stats">
              <span><strong>5,895 m</strong>Uhuru Peak</span>
              <span><strong>7 routes</strong>One summit line</span>
              <span><strong>5–9+ days</strong>Longer helps altitude</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="kilimanjaro-facts" aria-label="Kilimanjaro route facts">
        <div className="kilimanjaro-facts-inner">
          {routeFacts.map(({ icon: Icon, label, value }) => <div key={label}><Icon aria-hidden="true" size={19} /><span>{label}</span><strong>{value}</strong></div>)}
        </div>
      </section>

      <section id="routes" className="kilimanjaro-routes-section" aria-labelledby="kilimanjaro-routes-heading">
        <div className="kilimanjaro-section-heading">
          <div><p className="eyebrow">Find your line</p><h2 id="kilimanjaro-routes-heading">The right route changes the whole climb.</h2></div>
          <p>These are planning ranges, not fixed departures. Open a route to read the full day-by-day rhythm, then we confirm the gate, camp allocation, current park rules and your group&apos;s experience before we quote.</p>
        </div>
        <div className="kilimanjaro-route-grid">
          {kilimanjaroRoutes.map((route) => (
            <article className={`kilimanjaro-route-card route-accent-${route.accent}`} key={route.key}>
              <div className="kilimanjaro-route-card-topline"><span>{route.number}</span><p>{route.label}</p><Mountain aria-hidden="true" size={20} /></div>
              <h3>{route.name}</h3>
              <p className="kilimanjaro-route-copy">{route.copy}</p>
              <div className="kilimanjaro-route-facts">
                <span><CalendarDays aria-hidden="true" size={14} /><b>Time</b>{route.duration}</span>
                <span><Route aria-hidden="true" size={14} /><b>Distance</b>{route.distance}</span>
                <span><BedDouble aria-hidden="true" size={14} /><b>Sleep</b>{route.sleep}</span>
                <span><MapPin aria-hidden="true" size={14} /><b>Start</b>{route.gate}</span>
              </div>
              <div className="kilimanjaro-route-line"><span>Route line</span><strong>{route.route}</strong></div>
              <div className="kilimanjaro-route-fit"><Check aria-hidden="true" size={15} /><span><b>Best for</b>{route.bestFor}</span></div>
              <p className="kilimanjaro-route-note">{route.note}</p>
              <Link className="kilimanjaro-route-action" to={`/itineraries/kilimanjaro/${route.key}`}>View full itinerary <ArrowRight aria-hidden="true" size={15} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="kilimanjaro-choice-section" aria-labelledby="kilimanjaro-choice-heading">
        <div className="kilimanjaro-choice-inner">
          <div className="kilimanjaro-choice-copy"><p className="eyebrow">A useful shortcut</p><h2 id="kilimanjaro-choice-heading">Start with the kind of day you want.</h2><p>Route names can sound interchangeable until you look at the first night, the sleeping setup and the altitude profile. Use this quick read before you ask for a quote.</p></div>
          <div className="kilimanjaro-choice-list">
            <div><span>01</span><strong>Want huts?</strong><p>Marangu is the only standard ascent with permanent hut accommodation.</p></div>
            <div><span>02</span><strong>Want the calmest build?</strong><p>Lemosho gives a lower, slower opening. Northern Circuit adds even more nights.</p></div>
            <div><span>03</span><strong>Want the quiet north?</strong><p>Rongai approaches from the northern slope and descends through Marangu.</p></div>
            <div><span>04</span><strong>Want a direct challenge?</strong><p>Umbwe is steep from the start. It suits experienced hikers, not a budget shortcut.</p></div>
          </div>
        </div>
      </section>

      <section className="kilimanjaro-closing">
        <div><p className="eyebrow">Build your climb</p><h2>The best route is the one your body can enjoy.</h2><p>Tell us your dates, recent hiking experience and whether you prefer huts, quieter trails or more time on the mountain. We will recommend a route and a realistic pace.</p></div>
        <Link className="kilimanjaro-closing-action" to="/enquire">Ask for a route recommendation <ArrowRight aria-hidden="true" size={16} /></Link>
      </section>
    </div>
  );
}
