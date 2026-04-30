import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Plane,
  TrainFront,
  Bus,
  Footprints,
  MapPin,
  Calendar,
  Bed,
  Check,
  ChevronRight,
  ChevronDown,
  Map as MapIcon,
  ListTree,
  Sparkles,
  Sun,
  Moon,
  Clock,
  CircleDot,
  Hash,
  ArrowRight,
  X,
  Compass,
  Luggage,
  AlertTriangle,
  Timer,
  Globe,
  Ticket,
  Navigation,
  Sailboat,
  Home,
} from "lucide-react";

// ---------- Trip data ---------------------------------------------------------

const STOPS = [
  {
    id: "cusco-1",
    city: "Cusco",
    country: "Peru",
    flag: "🇵🇪",
    start: "2026-06-23",
    end: "2026-06-25",
    nights: 2,
    lat: -13.5319,
    lng: -71.9675,
    accom: "Hotel Casa Fierro Cusco",
    accomCost: 126,
    accomPayer: "Ethan",
    note: "Land 17:10 from a 20+ hour journey. Sea-level Sydney to 3,400m Cusco — easy first evening, lots of water, no booze. Coca tea is local cure for altitude.",
  },
  {
    id: "aguas",
    city: "Aguas Calientes",
    country: "Peru",
    flag: "🇵🇪",
    start: "2026-06-25",
    end: "2026-06-27",
    nights: 2,
    lat: -13.1547,
    lng: -72.524,
    accom: "Samananchis Machupicchu",
    accomCost: 125,
    accomPayer: "Ethan",
    headline: "Machu Picchu walk-up",
    headlineDetail: "10:00 AM, Fri 26 Jun · booked · Luke paid $250",
  },
  {
    id: "rio",
    city: "Rio de Janeiro",
    country: "Brazil",
    flag: "🇧🇷",
    start: "2026-06-28",
    end: "2026-07-02",
    nights: 4,
    lat: -22.9068,
    lng: -43.1729,
    accom: "Hotel Astoria Copacabana",
    accomCost: 441,
    accomPayer: "Ethan",
    accomAddress: "R. República do Peru, 345 — Copacabana",
    note: "Pack-it-in day-plan ready (Sugarloaf → Cristo → Aprazível → Selarón → Arpoador → Lapa). Wed 1 Jul is the cleanest run.",
  },
  {
    id: "lisbon",
    city: "Lisbon",
    country: "Portugal",
    flag: "🇵🇹",
    start: "2026-07-03",
    end: "2026-07-06",
    nights: 3,
    lat: 38.7223,
    lng: -9.1393,
    accom: "Santos Stay by Madrabica",
    accomCost: 320,
    accomPayer: "Luke",
    accomAddress: "Rua Vicente Borga, Estrela",
    note: "Land 08:00 — bag drop, then breakfast and explore. Check-in proper from 13:00.",
  },
  {
    id: "lagos",
    city: "Lagos",
    country: "Portugal",
    flag: "🇵🇹",
    start: "2026-07-06",
    end: "2026-07-10",
    nights: 4,
    lat: 37.1028,
    lng: -8.674,
    accom: "Safari Beach guest house",
    accomCost: 483,
    accomPayer: "Luke",
    accomAddress: "Torraltinha — Rua Alexandre Herculano V47",
    note: "Beach week. Ponta da Piedade kayaking is the unmissable.",
  },
  {
    id: "madrid",
    city: "Madrid",
    country: "Spain",
    flag: "🇪🇸",
    start: "2026-07-10",
    end: "2026-07-14",
    nights: 4,
    lat: 40.4168,
    lng: -3.7038,
    accom: "Toc Hostel Madrid (2 rooms)",
    accomCost: 570,
    accomPayer: "Ethan",
    accomAddress: "Plaza de Celenque 3, Madrid City Center",
  },
  {
    id: "dublin",
    city: "Dublin",
    country: "Ireland",
    flag: "🇮🇪",
    start: "2026-07-14",
    end: "2026-07-18",
    nights: 4,
    lat: 53.3498,
    lng: -6.2603,
    accom: "Abbey Court Hostel (2 rooms)",
    accomCost: 519,
    accomPayer: "Ethan",
    accomAddress: "29 Bachelors Walk, D01",
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    flag: "🇳🇱",
    start: "2026-07-18",
    end: "2026-07-22",
    nights: 4,
    lat: 52.3676,
    lng: 4.9041,
    accom: "Hans Brinker Hostel",
    accomCost: 570,
    accomPayer: "Luke",
    accomAddress: "Kerkstraat 136-138, Amsterdam City Centre",
  },
  {
    id: "munich-1",
    city: "Munich",
    country: "Germany",
    flag: "🇩🇪",
    start: "2026-07-22",
    end: "2026-07-26",
    nights: 4,
    lat: 48.1351,
    lng: 11.582,
    accom: "Luke's parents",
    isFamilyStay: true,
    note: "Train arrives München Hbf 17:40. Sleeping at Luke's family home for these 4 nights and again at trip's end.",
  },
  {
    id: "split",
    city: "Split",
    country: "Croatia",
    flag: "🇭🇷",
    start: "2026-07-26",
    end: "2026-07-27",
    nights: 1,
    lat: 43.5081,
    lng: 16.4402,
    accom: "En Route Hostel (2 rooms)",
    accomCost: 146,
    accomPayer: "Ethan",
    note: "One night before boarding the cruise. Hit Diocletian's Palace + Riva sunset.",
  },
  {
    id: "croatia-cruise",
    city: "Sail Croatia",
    country: "Adriatic",
    flag: "🇭🇷",
    start: "2026-07-27",
    end: "2026-08-03",
    nights: 7,
    lat: 43.0,
    lng: 17.0,
    accom: "Navigator Cruise · Split Return South",
    accomAddress: "Boarding in Split harbour",
    isCruise: true,
    note: "Party cruise (18–39). Hvar → Korčula → Dubrovnik → Mljet → Makarska → return to Split. Hula Hula at sunset, Culture Club Revelin in Dubrovnik, Blue & White Boat Party in Makarska. Cabin tier and total cost TBC.",
  },
  {
    id: "rome",
    city: "Rome",
    country: "Italy",
    flag: "🇮🇹",
    start: "2026-08-03",
    end: "2026-08-07",
    nights: 4,
    lat: 41.9028,
    lng: 12.4964,
    accom: "Hostel Mosaic",
    accomCost: 568,
    accomPayer: "Ethan",
  },
  {
    id: "pisa",
    city: "Pisa",
    country: "Italy",
    flag: "🇮🇹",
    start: "2026-08-07",
    end: "2026-08-09",
    nights: 2,
    lat: 43.7228,
    lng: 10.4017,
    accom: "Safestay Pisa Centrale",
    accomCost: 338,
    accomPayer: "Ethan",
  },
  {
    id: "bolzano",
    city: "Bolzano",
    country: "Italy",
    flag: "🇮🇹",
    start: "2026-08-09",
    end: "2026-08-13",
    nights: 4,
    lat: 46.4983,
    lng: 11.3548,
    accom: "Residence Fink Central Apartments",
    accomCost: 859.13,
    accomPayer: "Luke",
    note: "Dolomites base. Cable cars from town. Ötzi Museum is 90 min, cap it there.",
  },
  {
    id: "munich-2",
    city: "Munich",
    country: "Germany",
    flag: "🇩🇪",
    start: "2026-08-13",
    end: "2026-08-17",
    nights: 4,
    lat: 48.1351,
    lng: 11.582,
    accom: "Luke's parents",
    isFamilyStay: true,
    note: "Bus arrives Munich central 13:45. Last 4 nights at Luke's family home before flying home Mon 17 Aug.",
  },
  {
    id: "home",
    city: "Home · Sydney",
    country: "Australia",
    flag: "🇦🇺",
    start: "2026-08-18",
    end: "2026-08-19",
    nights: 0,
    lat: -33.8688,
    lng: 151.2093,
    isHome: true,
    note: "Trip wraps. Lands SYD 16:50. 56 days, 14 stops, two passports.",
  },
];

// Transport between stops, indexed by destination stop id (the leg that gets you there)
const TRANSPORT = {
  "cusco-1": {
    mode: "flight",
    label: "LATAM · Sydney → Santiago → Cusco",
    date: "2026-06-23",
    time: "11:45",
    detail: "LA810 SYD→SCL (12h45) · 4h10 layover Santiago · LA2367 SCL→CUZ (3h30)",
    cost: "TBC",
    fromPoint: "Sydney Kingsford Smith Airport",
    fromTerminal: "Terminal 1 International · LATAM check-in",
    fromAddress: "Departures Drive, Mascot NSW 2020, Australia",
    toPoint: "Alejandro Velasco Astete Intl (CUZ)",
    duration: "20h 25m incl. layover",
    arrives: "Tue 23 Jun 17:10 (local)",
    longHaul: true,
    bufferMin: 180,
    note: "Massive day. Sea-level Sydney to 3,400m Cusco in one go — go easy that first night.",
  },
  aguas: {
    mode: "train",
    label: "Bus + train · Cusco → Aguas Calientes",
    date: "2026-06-25",
    time: "08:00",
    detail: "Bus to Ollantaytambo, then The Voyager train.",
    cost: "Luke $58 bus · Ethan $354 train",
    fromPoint: "Estación de colectivos para Urubamba/Ollantaytambo",
    fromTerminal: "Bus departure stand · look for Ollantaytambo signs",
    fromAddress: "Av. Grau, Cusco 08002, Peru",
    toPoint: "Aguas Calientes · Machu Picchu Pueblo",
    duration: "~5h via Ollantaytambo",
    arrives: "~13:00",
    longHaul: false,
    bufferMin: 30,
    bookingRef: "BW5027937",
  },
  rio: {
    mode: "flight",
    label: "LATAM · Cusco → Lima → Rio",
    date: "2026-06-27",
    time: "18:45",
    detail: "CUZ→LIM (LA2277) · 2h45 layover · LIM→GIG (LA2404)",
    cost: "Luke $1,523",
    fromPoint: "Alejandro Velasco Astete Airport (CUZ)",
    fromTerminal: "Single terminal · LATAM domestic check-in",
    fromAddress: "Av. Velasco Astete s/n, Cusco 08002, Peru",
    toPoint: "Rio Galeão Intl (GIG)",
    duration: "9h25 incl. layover",
    arrives: "Sun 28 Jun 06:10",
    longHaul: true,
    bufferMin: 180,
    bookingRef: "40-935202117",
    pin: "6101",
  },
  lisbon: {
    mode: "flight",
    label: "Azul · Rio → Campinas → Lisbon",
    date: "2026-07-02",
    time: "13:20",
    detail: "GIG→VCP (AD2849) · 3h35 layover · VCP→LIS (AD8750)",
    cost: "Luke $2,194",
    fromPoint: "Rio Galeão International (GIG)",
    fromTerminal: "Terminal 2 · Azul check-in (verify on screens)",
    fromAddress: "Av. 20 de Janeiro, Ilha do Governador, Rio de Janeiro - RJ, 21941-900",
    toPoint: "Lisbon Humberto Delgado (LIS)",
    duration: "~14h incl. layover",
    arrives: "Fri 3 Jul 08:00",
    longHaul: true,
    bufferMin: 180,
    bookingRef: "UTYE6B",
  },
  lagos: {
    mode: "train",
    label: "Train · Lisbon → Lagos",
    date: "2026-07-06",
    time: "10:02",
    detail: "Train #570/5906 · 1 change · economy saver",
    cost: "Ethan $108",
    fromPoint: "Lisbon Oriente Station",
    fromTerminal: "Check platform on departures board ~15 min before",
    fromAddress: "Av. Dom João II, 1990-233 Lisboa, Portugal",
    toPoint: "Lagos Central Station",
    duration: "4h08",
    arrives: "14:10",
    longHaul: false,
    bufferMin: 30,
  },
  madrid: {
    mode: "flight",
    label: "Bus to Faro + Ryanair · Lagos → Madrid",
    date: "2026-07-10",
    time: "07:45",
    detail: "EVA bus 07:45 Lagos→Faro 10:15 (Luke $40) · then FR1473 Faro→Madrid 20:00 direct 1h20",
    cost: "Luke $250 + $500 (incl. bus + Ryanair)",
    fromPoint: "Lagos Bus Terminal (EVA)",
    fromTerminal: "EVA Transportes · platform shown on the day",
    fromAddress: "Rossio de São João, 8600-573 Lagos, Portugal",
    toPoint: "Madrid Barajas (MAD)",
    duration: "Long day · bus + 9h30 Faro layover + 1h20 flight",
    arrives: "22:20 Madrid",
    longHaul: false,
    bufferMin: 30,
    bookingRef: "F157YM",
    note: "Catch the 07:45 Lagos bus — set two alarms. Faro Airport check-in for Ryanair FR1473 opens 18:00 (2h before).",
    leg2: {
      label: "Then: Ryanair FR1473 · Faro → Madrid",
      time: "20:00",
      fromPoint: "Faro Airport (FAO)",
      fromTerminal: "Single terminal · Ryanair check-in",
      fromAddress: "8001-701 Faro, Portugal",
      bufferMin: 120,
    },
  },
  dublin: {
    mode: "flight",
    label: "Ryanair · Madrid → Dublin",
    date: "2026-07-14",
    time: "12:20",
    detail: "FR11 · 2h40 direct",
    cost: "Luke $500",
    fromPoint: "Madrid Barajas (MAD)",
    fromTerminal: "Terminal 1 · Ryanair check-in",
    fromAddress: "Av. de la Hispanidad, s/n, 28042 Madrid, Spain",
    toPoint: "Dublin Airport (DUB)",
    duration: "2h40",
    arrives: "14:00",
    longHaul: false,
    bufferMin: 120,
    bookingRef: "O285SW",
  },
  amsterdam: {
    mode: "flight",
    label: "Ryanair · Dublin → Amsterdam",
    date: "2026-07-18",
    time: "11:05",
    detail: "FR3006 · 1h40 direct",
    cost: "Luke $218",
    fromPoint: "Dublin Airport (DUB)",
    fromTerminal: "Terminal 1 · Ryanair check-in",
    fromAddress: "Dublin Airport, Co. Dublin, K67 PW77, Ireland",
    toPoint: "Schiphol (AMS)",
    duration: "1h40",
    arrives: "13:45",
    longHaul: false,
    bufferMin: 120,
    bookingRef: "FR3006",
  },
  "munich-1": {
    mode: "train",
    label: "Train · Amsterdam → München",
    date: "2026-07-22",
    time: "10:31",
    detail: "1 change · 7h09 · seats requested",
    cost: "—",
    fromPoint: "Amsterdam Centraal Station",
    fromTerminal: "Platform shown on departures board ~15 min before",
    fromAddress: "Stationsplein, 1012 AB Amsterdam, Netherlands",
    toPoint: "München Hauptbahnhof",
    duration: "7h09",
    arrives: "17:40",
    longHaul: false,
    bufferMin: 30,
    bookingRef: "938586908008",
  },
  split: {
    mode: "flight",
    label: "Lufthansa · Munich → Split",
    date: "2026-07-26",
    time: "14:55",
    detail: "LH1716 · 1h20 direct",
    cost: "Luke $772",
    fromPoint: "Munich Airport (MUC)",
    fromTerminal: "Terminal 2 · Lufthansa check-in",
    fromAddress: "Nordallee 25, 85356 München-Flughafen, Germany",
    toPoint: "Split Airport (SPU)",
    duration: "1h20",
    arrives: "16:15",
    longHaul: false,
    bufferMin: 120,
  },
  "croatia-cruise": {
    mode: "boat",
    label: "Board Sail Croatia · Navigator",
    date: "2026-07-27",
    time: "—",
    detail: "Walk from En Route Hostel to Split harbour. Boarding time TBC — confirm with Sail Croatia voucher.",
    cost: "—",
    fromPoint: "Split Harbour · Sail Croatia berth",
    fromTerminal: "Berth assigned in your Sail Croatia voucher (typically Riva-side moorings)",
    fromAddress: "Obala kneza Domagoja, 21000 Split, Croatia",
    toPoint: "Sail Croatia ship",
    duration: "—",
    arrives: "—",
    longHaul: false,
    bufferMin: 60,
    note: "Confirm boarding time. Most Sail Croatia routes board late morning / early afternoon on the Monday.",
  },
  rome: {
    mode: "flight",
    label: "Croatia Airlines · Split → Rome",
    date: "2026-08-03",
    time: "16:10",
    detail: "OU380 · 1h direct · disembark cruise in Split that morning",
    cost: "Luke $577",
    fromPoint: "Split Airport (SPU)",
    fromTerminal: "Single terminal · Croatia Airlines check-in",
    fromAddress: "Cesta dr. Franje Tuđmana 96, 21217 Kaštel Štafilić, Croatia",
    toPoint: "Rome Fiumicino (FCO)",
    duration: "1h",
    arrives: "17:10",
    longHaul: false,
    bufferMin: 120,
    note: "Disembark Sail Croatia in Split morning. Be off boat by ~12:30 to comfortably make this 16:10 flight. Cab harbour → SPU is ~25 min.",
  },
  pisa: {
    mode: "train",
    label: "Train · Rome → Pisa",
    date: "2026-08-07",
    time: "—",
    detail: "Booking ref 2816710426 · check time on Trenitalia app",
    cost: "Luke $100",
    fromPoint: "Roma Termini Station",
    fromTerminal: "Platform shown on departures board ~10 min before",
    fromAddress: "Piazza dei Cinquecento, 00185 Roma RM, Italy",
    toPoint: "Pisa Centrale",
    duration: "~3h",
    arrives: "TBC",
    longHaul: false,
    bufferMin: 30,
    bookingRef: "2816710426",
  },
  bolzano: {
    mode: "bus",
    label: "Bus · Pisa → Bolzano",
    date: "2026-08-09",
    time: "12:00",
    detail: "1 transfer en route · 9h20 ride",
    cost: "Luke $194",
    fromPoint: "Pisa · Pisamover stop (Aurelia/San Giusto)",
    fromTerminal: "Pisamover bus stop near the airport — check FlixBus app for exact location",
    fromAddress: "Via di San Giusto / Via Aurelia Sud, Pisa PI, Italy",
    toPoint: "Bolzano South (Stazione FS)",
    duration: "9h20",
    arrives: "21:20",
    longHaul: false,
    bufferMin: 30,
  },
  "munich-2": {
    mode: "bus",
    label: "FlixBus · Bolzano → Munich",
    date: "2026-08-13",
    time: "09:15",
    detail: "Direct · 4h30 · arrives Munich central bus station 13:45",
    cost: "Ethan $107.97",
    fromPoint: "Bolzano South Station",
    fromTerminal: "FlixBus stop outside the FS station — look for the green sign",
    fromAddress: "Via Garibaldi, 39100 Bolzano BZ, Italy",
    toPoint: "Munich Central Bus Station (ZOB)",
    duration: "4h30",
    arrives: "13:45 — straight to Luke's parents",
    longHaul: false,
    bufferMin: 30,
    bookingRef: "335 000 6578",
  },
  home: {
    mode: "flight",
    label: "Etihad · Munich → Sydney",
    date: "2026-08-17",
    time: "11:25",
    detail: "1 stop · 21h 25m · Economy Value · ref 8NCI3R",
    cost: "Ethan EUR 769.75",
    fromPoint: "Munich Airport (MUC)",
    fromTerminal: "Terminal 1 · Etihad check-in (NOT T2 — it's the smaller terminal)",
    fromAddress: "Nordallee 25, 85356 München-Flughafen, Germany",
    toPoint: "Sydney Kingsford Smith (SYD)",
    duration: "21h 25m incl. layover",
    arrives: "Tue 18 Aug 16:50 (+1 day)",
    longHaul: true,
    bufferMin: 180,
    bookingRef: "8NCI3R",
    note: "Last travel day. Hardest flight home — pack water, layers, charger, neck pillow.",
  },
};

// City day-plans. Rio is the full pack-it-in plan, others are curated highlight stacks.
const DAY_PLANS = {
  "cusco-1": {
    intro: "Acclimatise gently. Walking only on day one — altitude is real at 3,400m.",
    items: [
      { time: "Morning", name: "Plaza de Armas", note: "The cathedral and the surrounding arcades. Slow lap, take photos." },
      { time: "Late morning", name: "San Pedro Market", note: "Juices, fresh bread, local fruit. Skip the meat counter unless adventurous." },
      { time: "Afternoon", name: "San Blas neighbourhood", note: "Cobblestone climbs to artisan workshops and the white church. Cafés with views." },
      { time: "Late afternoon", name: "Sacsayhuamán ruins", note: "Inca stone fortress on the hill above town. Sunset over Cusco from up here is unbeatable." },
      { time: "Evening", name: "Pisco sour at Limbus Resto Bar", note: "Glass-walled rooftop, panoramic city view, the cocktails are the second-best thing about it." },
    ],
  },
  aguas: {
    intro: "The whole stop is the lead-up to one event: walking onto Machu Picchu on the 26th.",
    items: [
      { time: "26 Jun, 10:00", name: "Machu Picchu walk-up", note: "Booked. Luke paid $250. Bring passport, water, hat. Stay on the marked circuits." },
      { time: "Anytime", name: "Aguas Calientes hot springs", note: "Sulphur pools at the top of town. Cheap entry, useful after the ruins." },
      { time: "Afternoon", name: "Mercado Artesanal", note: "If you're buying souvenirs, here is cheaper than Cusco." },
      { time: "Dinner", name: "Indio Feliz", note: "Long-running French-Peruvian spot. Quirky, generous portions, good pisco list." },
    ],
  },
  rio: {
    intro: "Pack-it-in day. Wed 1 Jul is the cleanest run (Aprazível closed Mon, Rio Scenarium closed Sun/Mon/Tue).",
    items: [
      { time: "09:00", name: "Sugarloaf cable car", note: "Buy the Fast Pass online before the day. Two cable cars to the summit." },
      { time: "11:30", name: "Christ the Redeemer", note: "Cog train from Cosme Velho through Tijuca rainforest. Pre-book a slot." },
      { time: "13:30", name: "Lunch at Aprazível", note: "Treehouse-style, Santa Teresa hill. Reserve. Ask for sunset-side table. Octopus, palm-heart, caipirinhas." },
      { time: "15:30", name: "Escadaria Selarón", note: "215 mosaic-tiled steps. Walk to the top for better photos and fewer people." },
      { time: "16:30", name: "Pedra do Arpoador", note: "Be on the rocks by 16:30 for ~17:20 sunset. The crowd applauds when the sun drops." },
      { time: "19:00", name: "Garota de Ipanema", note: "Where Tom Jobim wrote 'The Girl from Ipanema'. Picanha, fried cassava, ice-cold chopp." },
      { time: "21:30", name: "Rio Scenarium, Lapa", note: "Three floors of antique-stuffed mansion, live samba, packed dance floor. Uber there + back, never walk." },
    ],
  },
  lisbon: {
    intro: "Three days. Belém morning, Alfama afternoon, Bairro Alto night, miradouros in between.",
    items: [
      { time: "Morning", name: "Belém — Tower + Jerónimos", note: "Tram 15 from Praça do Comércio. Both are quick visits, the queues are the cost." },
      { time: "11:00", name: "Pastéis de Belém", note: "The original. Eat them warm with cinnamon. Tap water, no fuss." },
      { time: "Afternoon", name: "Tram 28 to Alfama", note: "Stand at the front. Get off at Largo das Portas do Sol for the lookout." },
      { time: "Evening", name: "Time Out Market", note: "30+ stalls under one roof. Communal seating. Move between stalls instead of one big meal." },
      { time: "Night", name: "Pink Street + Bairro Alto bars", note: "Pensão Amor for cocktails, Park Bar for sunset rooftop, then wherever the crowd flows." },
      { time: "Anytime", name: "Miradouro de Santa Catarina", note: "Cheapest beer with the best view. Always full of locals." },
    ],
  },
  lagos: {
    intro: "Four days, beach base. The cliffs are the main event.",
    items: [
      { time: "Sunrise", name: "Ponta da Piedade", note: "Drone-iconic cliffs. Walk the boardwalk for free; kayak tours run hourly from Praia da Batata." },
      { time: "Morning", name: "Praia do Camilo", note: "200 wooden steps down to a tiny cove. Get there before 10am or it's full." },
      { time: "Afternoon", name: "Praia Dona Ana", note: "Bigger beach with rock formations. Lunch at Mar d'Estórias on the way back." },
      { time: "Evening", name: "Old Town tapas", note: "Casinha do Petisco for cataplana, A Forja for grilled fish. Both family-run, both small — book." },
      { time: "Night", name: "Stevie Ray's Blues Bar", note: "Live music nightly. Lagos is small — most party streets are within 4 blocks of here." },
    ],
  },
  madrid: {
    intro: "Four days. Tapas crawls, late dinners, art museums in the afternoon to escape heat.",
    items: [
      { time: "Morning", name: "Retiro Park", note: "Boats on the lake, Crystal Palace, the rose garden. Free, quiet, beautiful." },
      { time: "Late morning", name: "Mercado de San Miguel", note: "Tourist-priced but iconic. Iberico jamón, vermouth on tap, oysters by the each." },
      { time: "14:00", name: "Lunch — Casa Mono or Bar Lambuzo", note: "Casa Mono for menu del día, Lambuzo for Andalucian seafood. Locals eat at 14:30+." },
      { time: "16:00", name: "Museo del Prado", note: "Free 18:00–20:00 daily. Velázquez, Goya, Bosch's Garden of Earthly Delights." },
      { time: "20:00", name: "Tapas crawl in La Latina", note: "Cava Baja street. Order a caña + one tapa per bar, walk to the next. 4-5 stops." },
      { time: "00:00", name: "Sala Equis or Teatro Barceló", note: "Sala Equis is laid-back cinema-bar; Barceló is full-blown club. Madrid doesn't peak till 02:00." },
    ],
  },
  dublin: {
    intro: "Four days. Pubs are the whole point but pace it — they don't close, you do.",
    items: [
      { time: "Morning", name: "Trinity College + Book of Kells", note: "Pre-book online. The Long Room library is the actual reason to go." },
      { time: "Late morning", name: "Walk Stephen's Green → Grafton St", note: "Grafton is buskers and shopping. Stop at Bewley's for the stained glass." },
      { time: "Afternoon", name: "Guinness Storehouse", note: "Touristy but fun. Pint at the Gravity Bar with the 360° city view. Pre-book a slot." },
      { time: "Pre-dinner", name: "Cobblestone, Smithfield", note: "Trad music sessions every night. Locals' pub, no nonsense. Get there for the early session at 19:00." },
      { time: "Dinner", name: "The Winding Stair", note: "Above the bookshop, on the Liffey. Modern Irish, one of the few places worth the price in Temple Bar area." },
      { time: "Late", name: "Whelan's or Workman's Club", note: "Skip the actual Temple Bar pub (overpriced). Whelan's has live music; Workman's is a venue/club hybrid." },
    ],
  },
  amsterdam: {
    intro: "Four days. Bike everywhere. Don't walk in bike lanes, it's the unspoken rule.",
    items: [
      { time: "Morning", name: "Anne Frank House", note: "Tickets release exactly 6 weeks ahead and sell out in minutes. Set a reminder. Otherwise impossible." },
      { time: "Late morning", name: "Jordaan canals", note: "The prettiest district. Brunch at Winkel 43 — the Dutch apple pie is famous for a reason." },
      { time: "Afternoon", name: "Van Gogh Museum or Rijksmuseum", note: "Pick one — both are 2-3 hours minimum. Rijks for breadth, Van Gogh for depth." },
      { time: "Late afternoon", name: "Vondelpark", note: "Hire bikes (MacBike), do a slow loop, beer at Het Blauwe Theehuis." },
      { time: "Evening", name: "De Pijp dinner", note: "Bar Fisk for fish, Volt for European, Sla for healthy reset. Walk Albert Cuyp Market beforehand." },
      { time: "Night", name: "Brouwerij 't IJ → Hannekes Boom", note: "Brewery in a windmill, then a wooden waterfront bar. That's an Amsterdam evening." },
    ],
  },
  "munich-1": {
    intro: "Four days. Beer, baroque, BMW, Bavarian Alps day trip.",
    items: [
      { time: "Morning", name: "Marienplatz + New Town Hall glockenspiel", note: "11:00 daily for the chime show. Climb the tower for views." },
      { time: "Lunch", name: "Hofbräuhaus or Augustiner Bräustuben", note: "Hofbräuhaus is the famous one (touristy but iconic). Augustiner is where Müncheners actually drink. Order weisswurst before noon only — local rule." },
      { time: "Afternoon", name: "English Garden + Eisbach surfers", note: "City-centre river wave with year-round surfers. Then walk to the Chinese Tower beer garden." },
      { time: "Day trip", name: "Neuschwanstein Castle", note: "2hr train. Disney's Sleeping Beauty castle reference. Book the timed entry slot before you go." },
      { time: "Evening", name: "Viktualienmarkt biergarten", note: "Open-air market with rotating breweries. Bring your own food, buy the beer." },
    ],
  },
  split: {
    intro: "One night only. Make it count.",
    items: [
      { time: "Afternoon", name: "Diocletian's Palace", note: "A 1700-year-old Roman palace you can walk through, eat in, drink in. The whole old town is inside it." },
      { time: "Late afternoon", name: "Bell Tower of Saint Domnius", note: "Tight steep climb, but the rooftop view of the orange-tile city + Adriatic is the photo." },
      { time: "Sunset", name: "Riva promenade", note: "Long palm-lined waterfront. Aperol, people-watching, ferries coming in." },
      { time: "Dinner", name: "Konoba Matejuška", note: "Tiny seafood spot in a back alley. Black risotto, octopus, white wine. Book ahead." },
    ],
  },
  "croatia-cruise": {
    intro: "Sail Croatia · Navigator Cruise · Split Return South. Party cruise (18–39). All meals + accommodation onboard. 7 nights, ending back in Split for the flight to Rome.",
    items: [
      { time: "Mon 27 Jul", name: "Check-in Split → sail to Hvar", note: "Walk from En Route Hostel to harbour with bags. Confirm boarding time on the Sail Croatia voucher. First night in Hvar — Hula Hula Bar at sunset (cocktails on the rocks, Hvar's iconic beach club)." },
      { time: "Tue 28 Jul", name: "Korčula", note: "Marco Polo's birthplace. Walled town, narrow stone alleys, Grk wine tasting. Optional excursion: kayaking around the islands (~€40)." },
      { time: "Wed 29 Jul", name: "Dubrovnik · Day 1", note: "Walk the Old City Walls early before the heat — 2km loop, the photo of the trip. Cable car up Mt Srđ at sunset." },
      { time: "Thu 30 Jul", name: "Dubrovnik · Day 2", note: "Kayak around Lokrum island, lunch in the old town, then party night at Culture Club Revelin — biggest club in Dubrovnik, inside a 16th-century fortress." },
      { time: "Fri 31 Jul", name: "Mljet", note: "Croatia's 'greenest island' — Mljet National Park. Bike or walk around the saltwater lakes, swim, visit the tiny island monastery in the middle of the lake." },
      { time: "Sat 1 Aug", name: "Makarska + Boat Party", note: "Beach town under Biokovo mountain. The Blue & White Boat Party in the evening is the cruise's signature night out." },
      { time: "Sun 2 Aug", name: "Final sail back to Split", note: "Recovery sail. Last meal onboard, exchange details with the crew + new mates." },
      { time: "Mon 3 Aug", name: "Disembark Split", note: "Off the boat in the morning. Flight to Rome 16:10 — be at SPU airport by 14:10 latest. Cabs from harbour to airport ~25 min." },
    ],
  },
  rome: {
    intro: "Four days. The classics, but with a Trastevere bias for evenings.",
    items: [
      { time: "Morning", name: "Colosseum + Forum + Palatine Hill", note: "One ticket, three sites, 4 hours. Pre-book skip-the-line. Go at opening (08:30) before the heat." },
      { time: "Late morning", name: "Pantheon + Piazza Navona", note: "Both free. The oculus in the Pantheon is unreal. Coffee at Sant'Eustachio after." },
      { time: "Afternoon", name: "Vatican Museums + Sistine Chapel", note: "Allow 3 hours minimum. Pre-book. Friday evening slots have fewer people." },
      { time: "Dusk", name: "Trevi Fountain", note: "Go at night when it's lit and emptier. Coin over your shoulder. Don't wade in." },
      { time: "Dinner", name: "Trastevere — Da Enzo or Tonnarello", note: "Cacio e pepe, carbonara, amatriciana — the Roman trinity. Both are tiny, queue early or go at 19:30." },
      { time: "Night", name: "Bar San Calisto", note: "No-frills locals' bar in Trastevere. Beer is €3. Conversations spill onto the piazza." },
    ],
  },
  pisa: {
    intro: "Two nights. Most people do Pisa in 4 hours — you've got time, so go beyond the tower.",
    items: [
      { time: "Morning", name: "Piazza dei Miracoli", note: "Tower + Cathedral + Baptistery. Pay to climb the tower (timed slot). Take the obligatory tower-prop photo." },
      { time: "Late morning", name: "Camposanto Monumentale", note: "Quiet covered cemetery on the same square. Hardly any tourists. Frescoes are stunning." },
      { time: "Afternoon", name: "Lungarni walk", note: "The riverside palazzi are gorgeous, especially Santa Maria della Spina (tiny gothic church on the bank)." },
      { time: "Evening", name: "Borgo Stretto + aperitivo", note: "Pisa's main shopping street with cafés. Try Bar Pasticceria Salza for vermouth + free snacks." },
    ],
  },
  bolzano: {
    intro: "Four days, Dolomites base. Half town life, half cable cars and lakes.",
    items: [
      { time: "Town day", name: "Walther Square + Ötzi Museum", note: "The 5,300-year-old iceman mummy is here. 90 minutes well spent." },
      { time: "Cable car", name: "Renon (Ritten) plateau", note: "Cable car from town to a high meadow. Walk to the earth pyramids, picnic, return." },
      { time: "Day trip", name: "Lago di Braies", note: "The most photographed lake in the Dolomites. 1h45 drive. Get there before 09:00." },
      { time: "Day trip", name: "Seceda ridge", note: "Alpe di Siusi cable car → ridgeline walk. The views are the screensaver kind." },
      { time: "Evening", name: "Hopfen + Co", note: "Brewpub on the main square. Speck, schlutzkrapfen, dark beer. Bavarian-Italian crossover food." },
    ],
  },
  "munich-2": {
    intro: "Trip ends. One last meal, then home.",
    items: [
      { time: "14:00", name: "Lunch at Augustiner-Keller", note: "Original Augustiner brewery beer garden. Roast pork knuckle, one final litre. Then the airport." },
    ],
  },
};

// ---------- Helpers -----------------------------------------------------------

const fmtDateShort = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
};
const fmtDateLong = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
const fmtMonthYear = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
};
const daysBetween = (a, b) => {
  const A = new Date(a + (a.length === 10 ? "T00:00:00" : ""));
  const B = b instanceof Date ? b : new Date(b + (b.length === 10 ? "T00:00:00" : ""));
  return Math.round((A - B) / 86400000);
};
const todayISO = (d = new Date()) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};
const isCurrent = (stop, today) => stop.start <= today && today < stop.end;
const isPast = (stop, today) => stop.end <= today;
const isFuture = (stop, today) => stop.start > today;

const transportIcon = (mode) => {
  if (mode === "flight") return Plane;
  if (mode === "train") return TrainFront;
  if (mode === "bus") return Bus;
  if (mode === "boat") return Sailboat;
  return Footprints;
};

// ---------- Persistent state hook --------------------------------------------

const STORAGE_KEY = "trip:state";
const DEFAULT_STATE = {
  completed: {},
  notes: {},
  theme: "system",
  todayOverride: null,
};

function usePersistedState() {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_STATE;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...DEFAULT_STATE, ...JSON.parse(stored) };
    } catch {}
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  return [state, setState, true];
}

// ---------- Theme ------------------------------------------------------------

function useResolvedTheme(theme) {
  const [systemDark, setSystemDark] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mql.matches);
    const handler = (e) => setSystemDark(e.matches);
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);
  if (theme === "dark") return "dark";
  if (theme === "light") return "light";
  return systemDark ? "dark" : "light";
}

// ---------- App --------------------------------------------------------------

export default function App() {
  const [state, setState, loaded] = usePersistedState();
  const resolvedTheme = useResolvedTheme(state.theme);
  const isDark = resolvedTheme === "dark";

  const today = state.todayOverride || todayISO();

  const [view, setView] = useState("timeline");
  const [selectedId, setSelectedId] = useState(null);

  const stopsWithStatus = useMemo(
    () =>
      STOPS.map((s) => ({
        ...s,
        status: isCurrent(s, today)
          ? "current"
          : isPast(s, today)
          ? "past"
          : "upcoming",
      })),
    [today]
  );

  const currentStop = stopsWithStatus.find((s) => s.status === "current");
  const nextStop = stopsWithStatus.find((s) => s.status === "upcoming");
  const tripStart = STOPS[0].start;
  const tripEnd = STOPS[STOPS.length - 1].end;
  const beforeTrip = today < tripStart;
  const afterTrip = today >= tripEnd;
  const daysToStart = beforeTrip ? daysBetween(tripStart, today) : 0;

  const toggleCompleted = (id) =>
    setState((s) => ({
      ...s,
      completed: { ...s.completed, [id]: !s.completed[id] },
    }));

  const setTheme = (t) => setState((s) => ({ ...s, theme: t }));

  const fontStack = `"Geist", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif`;
  const displayStack = `"Instrument Serif", "Times New Roman", serif`;

  const C = isDark
    ? {
        bg: "bg-zinc-950",
        bgSoft: "bg-zinc-900",
        bgCard: "bg-zinc-900/60",
        border: "border-zinc-800",
        borderSoft: "border-zinc-800/60",
        text: "text-zinc-100",
        textMuted: "text-zinc-400",
        textFaint: "text-zinc-500",
        accent: "bg-emerald-500",
        accentText: "text-emerald-400",
        accentBorder: "border-emerald-500/40",
        accentSoft: "bg-emerald-500/10",
        ring: "ring-zinc-700",
        hover: "hover:bg-zinc-800",
      }
    : {
        bg: "bg-zinc-50",
        bgSoft: "bg-white",
        bgCard: "bg-white",
        border: "border-zinc-200",
        borderSoft: "border-zinc-200/80",
        text: "text-zinc-900",
        textMuted: "text-zinc-500",
        textFaint: "text-zinc-400",
        accent: "bg-emerald-600",
        accentText: "text-emerald-700",
        accentBorder: "border-emerald-600/30",
        accentSoft: "bg-emerald-50",
        ring: "ring-zinc-300",
        hover: "hover:bg-zinc-100",
      };

  // Sync the `dark` class onto <html> so Tailwind's dark: variants resolve correctly
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div
      className={`min-h-screen ${C.bg} ${C.text} antialiased`}
      style={{ fontFamily: fontStack }}
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 pt-6 pb-32 sm:pb-12">
        <Header C={C} state={state} setTheme={setTheme} isDark={isDark} today={today} />

        <StatusStrip
          C={C}
          today={today}
          beforeTrip={beforeTrip}
          afterTrip={afterTrip}
          daysToStart={daysToStart}
          currentStop={currentStop}
          nextStop={nextStop}
          tripStart={tripStart}
          tripEnd={tripEnd}
          stops={STOPS}
        />

        <Tabs C={C} view={view} setView={setView} />

        <div className="mt-6 fadeup">
          {view === "timeline" && (
            <Timeline
              C={C}
              stops={stopsWithStatus}
              today={today}
              completed={state.completed}
              toggleCompleted={toggleCompleted}
              onSelect={(id) => {
                setSelectedId(id);
                setView("plans");
              }}
            />
          )}
          {view === "map" && (
            <MapView
              C={C}
              stops={stopsWithStatus}
              isDark={isDark}
              onSelect={(id) => {
                setSelectedId(id);
                setView("plans");
              }}
              selectedId={selectedId}
            />
          )}
          {view === "travel" && (
            <Travel
              C={C}
              stops={stopsWithStatus}
              today={today}
              completed={state.completed}
              toggleCompleted={toggleCompleted}
            />
          )}
          {view === "plans" && (
            <Plans
              C={C}
              stops={stopsWithStatus}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              completed={state.completed}
              toggleCompleted={toggleCompleted}
            />
          )}
        </div>

        <Footer C={C} />
      </div>

      <BottomTabs C={C} view={view} setView={setView} isDark={isDark} />
    </div>
  );
}

// ---------- Header -----------------------------------------------------------

function Header({ C, state, setTheme, isDark, today }) {
  return (
    <header className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div
          className={`h-9 w-9 rounded-xl ${C.accent} flex items-center justify-center text-white shadow-sm`}
        >
          <Compass className="w-4 h-4" />
        </div>
        <div className="leading-tight">
          <div className="text-[11px] uppercase tracking-[0.18em] font-medium text-emerald-600 dark:text-emerald-400">
            Big Trip · 2026
          </div>
          <div className="display text-[26px] sm:text-[30px] italic leading-none">
            Sydney → Sydney · the long way
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`h-9 w-9 rounded-full border ${C.border} ${C.hover} flex items-center justify-center transition-colors`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}

// ---------- Status strip -----------------------------------------------------

function StatusStrip({
  C,
  today,
  beforeTrip,
  afterTrip,
  daysToStart,
  currentStop,
  nextStop,
  tripStart,
  tripEnd,
  stops,
}) {
  const totalDays = daysBetween(tripEnd, tripStart);
  const elapsed = beforeTrip ? 0 : afterTrip ? totalDays : daysBetween(today, tripStart);
  const pct = Math.max(0, Math.min(100, (elapsed / totalDays) * 100));

  let primary, secondary;
  if (beforeTrip) {
    primary = `${daysToStart} ${daysToStart === 1 ? "day" : "days"} until takeoff`;
    secondary = `Trip starts ${fmtDateLong(tripStart)} · ${stops.length} stops over ${totalDays} days`;
  } else if (afterTrip) {
    primary = "Trip complete";
    secondary = `${stops.length} stops · ${totalDays} days · welcome home`;
  } else if (currentStop) {
    primary = `In ${currentStop.city} ${currentStop.flag}`;
    const daysLeft = daysBetween(currentStop.end, today);
    secondary = `${daysLeft} ${daysLeft === 1 ? "night" : "nights"} left here · next: ${nextStop?.city ?? "—"}`;
  } else {
    primary = "Between stops";
    secondary = `Next: ${nextStop?.city ?? "—"} on ${nextStop ? fmtDateLong(nextStop.start) : ""}`;
  }

  return (
    <div className={`mb-6 rounded-2xl border ${C.border} ${C.bgCard} p-5`}>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className={`text-xs uppercase tracking-wider ${C.textMuted} mb-1.5`}>
            {beforeTrip ? "Status" : afterTrip ? "Status" : "Right now"}
          </div>
          <div className="text-xl sm:text-2xl font-medium leading-tight">{primary}</div>
          <div className={`mt-1 text-sm ${C.textMuted}`}>{secondary}</div>
        </div>
        <div className={`hidden sm:block text-right ${C.textFaint} text-xs num`}>
          <div>{fmtDateLong(today)}</div>
          <div className="mt-0.5">{Math.round(pct)}% complete</div>
        </div>
      </div>
      <div className={`mt-4 h-1 rounded-full ${C.borderSoft} bg-zinc-200/40 dark:bg-zinc-800 overflow-hidden`}>
        <div
          className={`h-full ${C.accent} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ---------- Tabs -------------------------------------------------------------

const TABS = [
  { id: "timeline", label: "Timeline", icon: ListTree },
  { id: "travel", label: "Travel", icon: Luggage },
  { id: "map", label: "Map", icon: MapIcon },
  { id: "plans", label: "Plans", icon: Sparkles },
];

function Tabs({ C, view, setView }) {
  return (
    <div
      className={`hidden sm:flex items-center gap-1 p-1 rounded-full border ${C.border} ${C.bgCard} w-fit`}
    >
      {TABS.map((t) => {
        const Icon = t.icon;
        const active = view === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors ${
              active
                ? `${C.text} ${C.bgSoft} shadow-sm`
                : `${C.textMuted} ${C.hover}`
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function BottomTabs({ C, view, setView, isDark }) {
  return (
    <div
      className={`sm:hidden fixed bottom-0 inset-x-0 z-50 border-t ${C.border} ${
        isDark ? "bg-zinc-950/95" : "bg-white/95"
      } backdrop-blur-md`}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = view === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-colors ${
                active ? C.text : C.textMuted
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Timeline ---------------------------------------------------------

function Timeline({ C, stops, today, completed, toggleCompleted, onSelect }) {
  // group by month for legibility
  const groups = useMemo(() => {
    const out = [];
    let lastKey = null;
    stops.forEach((s) => {
      const key = s.start.slice(0, 7);
      if (key !== lastKey) {
        out.push({ key, label: fmtMonthYear(s.start), items: [] });
        lastKey = key;
      }
      out[out.length - 1].items.push(s);
    });
    return out;
  }, [stops]);

  return (
    <div className="space-y-7">
      {groups.map((g) => (
        <section key={g.key}>
          <div className={`mb-3 flex items-center gap-3`}>
            <div className={`text-[11px] uppercase tracking-[0.18em] font-medium ${C.textMuted}`}>
              {g.label}
            </div>
            <div className={`flex-1 h-px ${C.border} border-t`} />
          </div>
          <ol className="space-y-3">
            {g.items.map((s, idx) => (
              <StopCard
                key={s.id}
                C={C}
                stop={s}
                today={today}
                done={!!completed[s.id]}
                onToggle={() => toggleCompleted(s.id)}
                onOpen={() => onSelect(s.id)}
              />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function StopCard({ C, stop, today, done, onToggle, onOpen }) {
  const transport = TRANSPORT[stop.id];
  const TIcon = transport ? transportIcon(transport.mode) : null;

  const statusBadge = () => {
    if (stop.status === "current")
      return (
        <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 flex items-center gap-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          You're here
        </span>
      );
    if (stop.status === "past")
      return (
        <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full border ${C.border} ${C.textFaint}`}>
          Done
        </span>
      );
    return null;
  };

  const typeBadge = () => {
    if (stop.isCruise)
      return (
        <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full border border-sky-500/40 text-sky-600 dark:text-sky-400 bg-sky-500/10">
          Cruise
        </span>
      );
    if (stop.isFamilyStay)
      return (
        <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full border border-violet-500/40 text-violet-600 dark:text-violet-400 bg-violet-500/10">
          Family stay
        </span>
      );
    if (stop.isHome)
      return (
        <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full border border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10">
          Home
        </span>
      );
    return null;
  };

  return (
    <li
      className={`group rounded-2xl border ${
        stop.status === "current" ? "border-emerald-500/40 ring-1 ring-emerald-500/20" : C.border
      } ${C.bgCard} overflow-hidden transition-all`}
    >
      {transport && (
        <div className={`flex items-start gap-2.5 px-5 pt-3.5 pb-3 border-b ${C.borderSoft} ${C.textMuted} text-xs`}>
          <TIcon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-medium ${C.text}`}>{transport.label}</span>
              <span className={`${C.textFaint}`}>·</span>
              <span className="num">
                {fmtDateShort(transport.date)}
                {transport.time ? ` · ${transport.time}` : ""}
              </span>
            </div>
            <div className={`mt-0.5 ${C.textFaint} truncate`}>{transport.detail}</div>
          </div>
          <span className={`shrink-0 num ${C.textFaint}`}>{transport.cost}</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {statusBadge()}
              {typeBadge()}
              <span className={`text-[11px] num ${C.textFaint}`}>
                {stop.isHome
                  ? `Land ${fmtDateShort(stop.start)} · 16:50`
                  : `${fmtDateShort(stop.start)} → ${fmtDateShort(stop.end)} · ${stop.nights || 0} ${stop.nights === 1 ? "night" : "nights"}`}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="display text-[28px] italic leading-tight truncate">
                {stop.city}
              </h3>
              <span className="text-base shrink-0">{stop.flag}</span>
            </div>
            <div className={`text-sm ${C.textMuted}`}>{stop.country}</div>

            {stop.headline && (
              <div className={`mt-3 text-sm flex items-start gap-2`}>
                <Sparkles className={`w-3.5 h-3.5 mt-0.5 ${C.accentText}`} />
                <div>
                  <div className="font-medium">{stop.headline}</div>
                  <div className={`${C.textFaint} text-xs num`}>{stop.headlineDetail}</div>
                </div>
              </div>
            )}

            {stop.accom && (
              <div className={`mt-3 flex items-start gap-2 text-sm ${C.textMuted}`}>
                <Bed className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <div className={`${C.text} truncate`}>{stop.accom}</div>
                  {stop.accomAddress && (
                    <div className={`${C.textFaint} text-xs truncate`}>
                      {stop.accomAddress}
                    </div>
                  )}
                  {stop.accomCost != null && (
                    <div className={`${C.textFaint} text-xs num mt-0.5`}>
                      AUD {stop.accomCost.toFixed(2)} · paid by {stop.accomPayer}
                    </div>
                  )}
                  {stop.isFamilyStay && (
                    <div className={`${C.textFaint} text-xs mt-0.5`}>
                      Free · staying with Luke's family
                    </div>
                  )}
                  {stop.isCruise && (
                    <div className={`${C.textFaint} text-xs mt-0.5`}>
                      All-inclusive · cabin and excursions TBC
                    </div>
                  )}
                </div>
              </div>
            )}

            {stop.note && (
              <div className={`mt-3 text-sm ${C.textMuted} leading-relaxed`}>
                {stop.note}
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={onToggle}
              aria-label={done ? "Mark not done" : "Mark done"}
              className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all ${
                done
                  ? `${C.accent} border-transparent text-white`
                  : `${C.border} ${C.textFaint} ${C.hover}`
              }`}
            >
              {done ? <Check className="w-4 h-4" /> : <CircleDot className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <button
          onClick={onOpen}
          className={`mt-4 inline-flex items-center gap-1.5 text-sm ${C.accentText} hover:underline`}
        >
          {DAY_PLANS[stop.id] ? "View day-plan" : "City notes"}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </li>
  );
}

// ---------- Map view ---------------------------------------------------------

function MapView({ C, stops, isDark, onSelect, selectedId }) {
  const W = 800;
  const H = 480;
  const PAD = 50;

  const visible = stops; // include all
  const lats = visible.map((s) => s.lat);
  const lngs = visible.map((s) => s.lng);
  const minLat = Math.min(...lats) - 4;
  const maxLat = Math.max(...lats) + 4;
  const minLng = Math.min(...lngs) - 6;
  const maxLng = Math.max(...lngs) + 6;

  const project = (lat, lng) => {
    const x = PAD + ((lng - minLng) / (maxLng - minLng)) * (W - 2 * PAD);
    const y = PAD + ((maxLat - lat) / (maxLat - minLat)) * (H - 2 * PAD);
    return [x, y];
  };

  // Build route lines between consecutive stops (skip gap if same as previous)
  const segments = [];
  for (let i = 0; i < visible.length - 1; i++) {
    const a = visible[i];
    const b = visible[i + 1];
    if (a.id === b.id) continue;
    const [x1, y1] = project(a.lat, a.lng);
    const [x2, y2] = project(b.lat, b.lng);
    // Curve: quadratic bezier with control point offset perpendicular to midpoint
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len;
    const ny = dx / len;
    const offset = Math.min(60, len * 0.18);
    const cx = mx + nx * offset;
    const cy = my + ny * offset;
    const segState =
      a.status === "past" && b.status === "past"
        ? "past"
        : a.status === "current" || b.status === "current"
        ? "current"
        : "future";
    segments.push({ d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, state: segState, key: `${a.id}-${b.id}` });
  }

  const routeColor = (state) => {
    if (state === "past") return isDark ? "#3f3f46" : "#d4d4d8";
    if (state === "current") return "#10b981";
    return isDark ? "#52525b" : "#a1a1aa";
  };

  const dotFill = (s) => {
    if (s.status === "current") return "#10b981";
    if (s.status === "past") return isDark ? "#3f3f46" : "#d4d4d8";
    return isDark ? "#fafafa" : "#18181b";
  };

  return (
    <div className={`rounded-2xl border ${C.border} ${C.bgCard} overflow-hidden`}>
      <div className={`px-5 py-3 border-b ${C.borderSoft} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <MapIcon className={`w-3.5 h-3.5 ${C.textMuted}`} />
          <span className="text-sm font-medium">Route — South America to Europe</span>
        </div>
        <div className={`flex items-center gap-3 text-[11px] ${C.textMuted}`}>
          <Legend color={isDark ? "#3f3f46" : "#d4d4d8"} label="Done" />
          <Legend color="#10b981" label="Now" />
          <Legend color={isDark ? "#fafafa" : "#18181b"} label="Upcoming" />
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="auto"
          className="block"
          style={{ background: isDark ? "#0a0a0b" : "#fafafa" }}
        >
          {/* graticule grid */}
          <g opacity={isDark ? 0.06 : 0.08}>
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={(W / 14) * i}
                y1={0}
                x2={(W / 14) * i}
                y2={H}
                stroke={isDark ? "#fafafa" : "#18181b"}
                strokeWidth={0.5}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={(H / 8) * i}
                x2={W}
                y2={(H / 8) * i}
                stroke={isDark ? "#fafafa" : "#18181b"}
                strokeWidth={0.5}
              />
            ))}
          </g>

          {/* routes */}
          {segments.map((seg) => (
            <path
              key={seg.key}
              d={seg.d}
              stroke={routeColor(seg.state)}
              strokeWidth={seg.state === "current" ? 2.2 : 1.2}
              strokeDasharray={seg.state === "future" ? "3 4" : undefined}
              fill="none"
              strokeLinecap="round"
            />
          ))}

          {/* stops */}
          {visible.map((s) => {
            const [x, y] = project(s.lat, s.lng);
            const r = s.status === "current" ? 7 : 5;
            const selected = selectedId === s.id;
            return (
              <g key={s.id} className="cursor-pointer" onClick={() => onSelect(s.id)}>
                {s.status === "current" && (
                  <circle cx={x} cy={y} r={14} fill="#10b981" opacity={0.18}>
                    <animate
                      attributeName="r"
                      values="10;18;10"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.25;0.05;0.25"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={dotFill(s)}
                  stroke={isDark ? "#09090b" : "#fafafa"}
                  strokeWidth={2}
                />
                {selected && (
                  <circle
                    cx={x}
                    cy={y}
                    r={r + 4}
                    fill="none"
                    stroke={isDark ? "#fafafa" : "#18181b"}
                    strokeWidth={1}
                  />
                )}
                <text
                  x={x + r + 5}
                  y={y + 3}
                  fontFamily="Geist, sans-serif"
                  fontSize="11"
                  fontWeight="500"
                  fill={isDark ? "#fafafa" : "#18181b"}
                >
                  {s.city}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className={`px-5 py-3 border-t ${C.borderSoft} text-xs ${C.textMuted}`}>
        Tap a city to open its day-plan. Route lines show flights, trains, and buses in chronological order.
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-block h-1.5 w-3 rounded-full"
        style={{ background: color }}
      />
      {label}
    </div>
  );
}

// ---------- Plans ------------------------------------------------------------

function Plans({ C, stops, selectedId, setSelectedId, completed, toggleCompleted }) {
  const selected = selectedId ? stops.find((s) => s.id === selectedId) : null;

  if (selected) {
    return (
      <PlanDetail
        C={C}
        stop={selected}
        onBack={() => setSelectedId(null)}
        completed={completed}
        toggleCompleted={toggleCompleted}
      />
    );
  }

  return (
    <div className="space-y-2">
      <div className={`text-[11px] uppercase tracking-[0.18em] font-medium ${C.textMuted} mb-2`}>
        Pick a city
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        {stops.map((s) => {
          const hasPlan = !!DAY_PLANS[s.id];
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`text-left p-4 rounded-xl border ${C.border} ${C.bgCard} ${C.hover} transition-colors flex items-center gap-3`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="display text-[20px] italic leading-tight truncate">
                    {s.city}
                  </span>
                  <span className="text-sm shrink-0">{s.flag}</span>
                </div>
                <div className={`text-xs ${C.textFaint} num`}>
                  {fmtDateShort(s.start)} – {fmtDateShort(s.end)}
                  {s.status === "current" ? " · now" : ""}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasPlan && (
                  <span className={`text-[10px] uppercase tracking-wider ${C.accentText}`}>
                    Plan
                  </span>
                )}
                <ChevronRight className={`w-4 h-4 ${C.textFaint}`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlanDetail({ C, stop, onBack, completed, toggleCompleted }) {
  const plan = DAY_PLANS[stop.id];

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className={`text-sm ${C.textMuted} hover:${C.text} flex items-center gap-1`}
      >
        <ChevronRight className="w-3.5 h-3.5 rotate-180" /> All cities
      </button>

      <div className={`rounded-2xl border ${C.border} ${C.bgCard} p-6`}>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-medium text-emerald-600 dark:text-emerald-400">
          {stop.country}
        </div>
        <div className="display text-[40px] sm:text-[48px] italic leading-none mt-1">
          {stop.city} <span className="not-italic">{stop.flag}</span>
        </div>
        <div className={`mt-2 text-sm ${C.textMuted} num`}>
          {fmtDateLong(stop.start)} → {fmtDateLong(stop.end)} ·{" "}
          {stop.nights || 0} {stop.nights === 1 ? "night" : "nights"}
        </div>

        {plan?.intro && (
          <p className={`mt-4 text-[15px] leading-relaxed ${C.textMuted}`}>
            {plan.intro}
          </p>
        )}

        {!plan && (
          <p className={`mt-4 text-[15px] leading-relaxed ${C.textMuted}`}>
            No detailed plan for this stop yet. {stop.note}
          </p>
        )}
      </div>

      {plan && (
        <ol className="relative space-y-3">
          {plan.items.map((it, i) => {
            const itemId = `${stop.id}:${i}`;
            const done = !!completed[itemId];
            return (
              <li
                key={itemId}
                className={`relative rounded-xl border ${C.border} ${C.bgCard} p-4 flex items-start gap-4`}
              >
                <button
                  onClick={() => toggleCompleted(itemId)}
                  className={`mt-1 h-6 w-6 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                    done
                      ? `${C.accent} border-transparent text-white`
                      : `${C.border} ${C.textFaint}`
                  }`}
                >
                  {done && <Check className="w-3 h-3" />}
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className={`text-[10px] uppercase tracking-[0.16em] ${C.textFaint} num`}>
                      {it.time}
                    </span>
                  </div>
                  <div className={`text-[15px] font-medium leading-snug ${done ? "line-through opacity-60" : ""}`}>
                    {it.name}
                  </div>
                  <div className={`mt-1 text-sm leading-relaxed ${C.textMuted}`}>
                    {it.note}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <div className={`rounded-xl border ${C.border} ${C.bgCard} p-4 text-xs ${C.textMuted} flex items-start gap-3`}>
        <Hash className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <div>
          Tick items as you do them. Progress saves locally so this stays in sync across sessions on the same device.
        </div>
      </div>
    </div>
  );
}

// ---------- Travel ----------------------------------------------------------

function subtractMinutes(timeStr, minutes) {
  if (!timeStr || timeStr === "—" || !timeStr.includes(":")) return null;
  const [h, m] = timeStr.split(":").map(Number);
  const total = h * 60 + m - minutes;
  const wrapped = (total + 24 * 60) % (24 * 60);
  const hh = Math.floor(wrapped / 60);
  const mm = wrapped % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

const TRAVEL_CHECKLIST = [
  { id: "passport", label: "Passport in carry-on (not checked luggage)" },
  { id: "ref", label: "Booking ref / QR code saved offline" },
  { id: "phone", label: "Phone fully charged + power bank packed" },
  { id: "wallet", label: "Wallet, cards, some local cash for arrival" },
  { id: "water", label: "Empty water bottle (fill after security)" },
  { id: "snacks", label: "Snacks for the journey" },
  { id: "meds", label: "Any meds in carry-on, not checked" },
  { id: "addr", label: "Next accommodation address saved offline" },
];

const LONGHAUL_EXTRAS = [
  { id: "vax", label: "Vaccination card / health forms" },
  { id: "adapter", label: "Power adapter for new region" },
  { id: "comfort", label: "Eye mask, neck pillow, layers (cabins get cold)" },
];

function Travel({ C, stops, today, completed, toggleCompleted }) {
  const travelDays = useMemo(() => {
    const days = [];
    Object.entries(TRANSPORT).forEach(([destId, t]) => {
      const dest = STOPS.find((s) => s.id === destId);
      const destIdx = STOPS.findIndex((s) => s.id === destId);
      const origin = destIdx > 0 ? STOPS[destIdx - 1] : null;
      let status = "upcoming";
      if (t.date < today) status = "past";
      else if (t.date === today) status = "today";
      days.push({ destId, t, origin, dest, status });
    });
    return days.sort((a, b) => a.t.date.localeCompare(b.t.date));
  }, [today]);

  const todayDay = travelDays.find((d) => d.status === "today");
  const upcoming = travelDays.filter((d) => d.status === "upcoming");
  const past = travelDays.filter((d) => d.status === "past");

  return (
    <div className="space-y-7">
      {todayDay && (
        <TodayCallout
          C={C}
          day={todayDay}
          completed={completed}
          toggleCompleted={toggleCompleted}
        />
      )}

      <section>
        <SectionHeader
          C={C}
          label={todayDay ? "Coming up" : "All travel days"}
          right={`${upcoming.length} to go`}
        />
        <div className="space-y-3">
          {upcoming.length === 0 && !todayDay && (
            <div className={`rounded-xl border ${C.border} ${C.bgCard} p-5 text-sm ${C.textMuted}`}>
              No upcoming travel days. {past.length > 0 ? "Trip's done." : ""}
            </div>
          )}
          {upcoming.map((d) => (
            <TravelCard
              key={d.destId}
              C={C}
              day={d}
              today={today}
              completed={completed}
              toggleCompleted={toggleCompleted}
            />
          ))}
        </div>
      </section>

      {past.length > 0 && (
        <section>
          <SectionHeader C={C} label="Completed" right={`${past.length} done`} />
          <div className="space-y-3">
            {past.map((d) => (
              <TravelCard
                key={d.destId}
                C={C}
                day={d}
                today={today}
                completed={completed}
                toggleCompleted={toggleCompleted}
                muted
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeader({ C, label, right }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <div className={`text-[11px] uppercase tracking-[0.18em] font-medium ${C.textMuted}`}>
        {label}
      </div>
      <div className={`flex-1 h-px ${C.border} border-t`} />
      {right && <div className={`text-[11px] num ${C.textFaint}`}>{right}</div>}
    </div>
  );
}

function mapsUrl(address) {
  if (!address) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function TodayCallout({ C, day, completed, toggleCompleted }) {
  const { t, origin, dest } = day;
  const beAtBy = t.time && t.bufferMin ? subtractMinutes(t.time, t.bufferMin) : null;
  const TIcon = transportIcon(t.mode);
  const url = mapsUrl(t.fromAddress);

  return (
    <div className={`rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/5 p-5 sm:p-6 ring-2 ring-emerald-500/10`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-emerald-700 dark:text-emerald-300">
          Travel day · today
        </span>
      </div>
      <div className="display text-[32px] sm:text-[40px] italic leading-none">
        {origin?.city} <span className="not-italic">→</span> {dest.city}
      </div>
      <div className={`mt-2 text-sm ${C.textMuted} flex items-center gap-2`}>
        <TIcon className="w-3.5 h-3.5" />
        {t.label}
      </div>

      {/* Big "be at X by Y" panel */}
      <div className="mt-5 rounded-xl bg-white/60 dark:bg-zinc-900/40 border border-emerald-500/20 p-4 sm:p-5">
        <div className={`text-[10px] uppercase tracking-[0.18em] font-medium ${C.textMuted} mb-2`}>
          Be at
        </div>
        <div className="text-[17px] sm:text-[20px] font-medium leading-tight">
          {t.fromPoint || origin?.city || "—"}
        </div>
        {t.fromTerminal && (
          <div className={`mt-1 text-sm ${C.textMuted}`}>{t.fromTerminal}</div>
        )}
        {t.fromAddress && (
          <div className="mt-2 flex items-start gap-2">
            <MapPin className={`w-3.5 h-3.5 mt-0.5 ${C.textFaint} shrink-0`} />
            <div className={`text-xs ${C.textMuted} flex-1 leading-relaxed`}>{t.fromAddress}</div>
          </div>
        )}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 hover:underline`}
          >
            <Navigation className="w-3 h-3" />
            Open in Google Maps
          </a>
        )}

        {beAtBy && (
          <div className={`mt-4 pt-4 border-t ${C.borderSoft} flex items-baseline gap-3`}>
            <div className={`text-[10px] uppercase tracking-[0.18em] font-medium ${C.textMuted}`}>
              By
            </div>
            <div className="display text-[40px] sm:text-[44px] italic leading-none num text-emerald-700 dark:text-emerald-300">
              {beAtBy}
            </div>
            <div className={`text-[11px] num ${C.textFaint}`}>
              · depart {t.time}
            </div>
          </div>
        )}
        <div className={`mt-2 text-[11px] ${C.textFaint}`}>
          Add your transit time from accommodation on top of this.
        </div>
      </div>

      <TravelChecklistInline
        C={C}
        destId={day.destId}
        longHaul={t.longHaul}
        completed={completed}
        toggleCompleted={toggleCompleted}
      />
    </div>
  );
}

function TravelCard({ C, day, today, completed, toggleCompleted, muted = false }) {
  const [expanded, setExpanded] = useState(false);
  const { t, origin, dest, status } = day;
  const TIcon = transportIcon(t.mode);
  const beAtBy = t.time && t.bufferMin ? subtractMinutes(t.time, t.bufferMin) : null;
  const daysAway = daysBetween(t.date, today);
  const url = mapsUrl(t.fromAddress);

  return (
    <div
      className={`rounded-2xl border ${C.border} ${C.bgCard} overflow-hidden transition-all ${
        muted ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div className={`shrink-0 mt-1 h-10 w-10 rounded-xl border ${C.border} flex items-center justify-center`}>
          <TIcon className={`w-4 h-4 ${C.textMuted}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {t.longHaul && (
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full border border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Long-haul
              </span>
            )}
            <span className={`text-[11px] num ${C.textFaint}`}>
              {fmtDateLong(t.date)}
            </span>
            {status === "upcoming" && (
              <span className={`text-[11px] num ${C.textFaint}`}>
                · in {daysAway} {daysAway === 1 ? "day" : "days"}
              </span>
            )}
          </div>

          <div className="display text-[24px] italic leading-tight mt-1 truncate">
            {origin?.city || "—"} <span className="not-italic">→</span> {dest.city}
          </div>
          <div className={`text-sm ${C.textMuted} truncate`}>{t.label}</div>

          {beAtBy && (
            <div className="mt-3 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className={`text-[10px] uppercase tracking-wider ${C.textFaint}`}>Be there by</span>
                <span className="display text-[24px] italic num leading-none">{beAtBy}</span>
                <span className={`text-xs ${C.textFaint} num`}>· depart {t.time}</span>
              </div>
              {t.fromPoint && (
                <div className={`flex items-start gap-1.5 text-xs ${C.textMuted}`}>
                  <MapPin className={`w-3 h-3 mt-0.5 ${C.textFaint} shrink-0`} />
                  <span className="truncate">{t.fromPoint}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 ${C.textFaint} transition-transform shrink-0 mt-2 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className={`px-5 pb-5 pt-1 border-t ${C.borderSoft} space-y-4`}>
          {/* Departure point — exact location, terminal, address, maps link */}
          <div className={`mt-4 rounded-xl border ${C.borderSoft} ${C.bgSoft} p-4`}>
            <div className={`text-[10px] uppercase tracking-[0.18em] font-medium ${C.textMuted} mb-2`}>
              Departure point
            </div>
            <div className={`text-[15px] font-medium leading-tight ${C.text}`}>
              {t.fromPoint || origin?.city || "—"}
            </div>
            {t.fromTerminal && (
              <div className={`mt-1 text-sm ${C.textMuted}`}>{t.fromTerminal}</div>
            )}
            {t.fromAddress && (
              <div className="mt-2 flex items-start gap-2">
                <MapPin className={`w-3.5 h-3.5 mt-0.5 ${C.textFaint} shrink-0`} />
                <div className={`text-xs ${C.textMuted} flex-1 leading-relaxed`}>{t.fromAddress}</div>
              </div>
            )}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium ${C.accentText} hover:underline`}
              >
                <Navigation className="w-3 h-3" />
                Open in Google Maps
              </a>
            )}
          </div>

          {/* Two-leg flights (e.g. Lagos → Faro bus + Faro → Madrid flight) */}
          {t.leg2 && (
            <div className={`rounded-xl border ${C.borderSoft} ${C.bgSoft} p-4`}>
              <div className={`text-[10px] uppercase tracking-[0.18em] font-medium ${C.textMuted} mb-2`}>
                Then leg 2
              </div>
              <div className={`text-[15px] font-medium leading-tight ${C.text}`}>
                {t.leg2.label}
              </div>
              <div className={`mt-1 text-sm ${C.textMuted}`}>
                {t.leg2.fromPoint} · be there by{" "}
                {subtractMinutes(t.leg2.time, t.leg2.bufferMin)} for{" "}
                {t.leg2.time} departure
              </div>
              {t.leg2.fromTerminal && (
                <div className={`mt-1 text-xs ${C.textFaint}`}>{t.leg2.fromTerminal}</div>
              )}
              {t.leg2.fromAddress && (
                <div className={`mt-1 text-xs ${C.textFaint}`}>{t.leg2.fromAddress}</div>
              )}
              {mapsUrl(t.leg2.fromAddress) && (
                <a
                  href={mapsUrl(t.leg2.fromAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-flex items-center gap-1.5 text-xs font-medium ${C.accentText} hover:underline`}
                >
                  <Navigation className="w-3 h-3" />
                  Open in Google Maps
                </a>
              )}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-3">
            <DetailLine
              C={C}
              icon={MapPin}
              label="To"
              value={t.toPoint || dest.city}
            />
            <DetailLine C={C} icon={Clock} label="Duration" value={t.duration || "—"} />
            <DetailLine C={C} icon={Timer} label="Arrives" value={t.arrives || "—"} />
            {t.bookingRef && (
              <DetailLine C={C} icon={Ticket} label="Ref" value={t.bookingRef} mono />
            )}
            {t.pin && <DetailLine C={C} icon={Hash} label="PIN" value={t.pin} mono />}
            <DetailLine C={C} icon={Hash} label="Cost" value={t.cost} />
          </div>

          {t.detail && (
            <div className={`text-xs ${C.textMuted} leading-relaxed`}>{t.detail}</div>
          )}

          {t.note && (
            <div className={`flex items-start gap-2 rounded-lg border ${C.border} bg-amber-500/5 px-3 py-2 text-xs ${C.text}`}>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
              <span>{t.note}</span>
            </div>
          )}

          <TravelChecklistInline
            C={C}
            destId={day.destId}
            longHaul={t.longHaul}
            completed={completed}
            toggleCompleted={toggleCompleted}
          />

          {dest.accom && (
            <div className={`rounded-xl border ${C.borderSoft} ${C.bgSoft} p-3 text-xs`}>
              <div className={`uppercase tracking-wider ${C.textFaint} mb-1`}>
                Where to head on arrival
              </div>
              <div className={`${C.text} font-medium`}>{dest.accom}</div>
              {dest.accomAddress && (
                <div className={C.textMuted}>{dest.accomAddress}</div>
              )}
              {mapsUrl(dest.accomAddress) && (
                <a
                  href={mapsUrl(dest.accomAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-flex items-center gap-1.5 text-xs font-medium ${C.accentText} hover:underline`}
                >
                  <Navigation className="w-3 h-3" />
                  Open in Google Maps
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DetailLine({ C, icon: Icon, label, value, mono }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className={`w-3.5 h-3.5 mt-0.5 ${C.textFaint} shrink-0`} />
      <div className="min-w-0">
        <div className={`text-[10px] uppercase tracking-wider ${C.textFaint}`}>{label}</div>
        <div className={`text-sm ${C.text} ${mono ? "num" : ""} truncate`}>{value}</div>
      </div>
    </div>
  );
}

function TravelChecklistInline({ C, destId, longHaul, completed, toggleCompleted }) {
  const items = longHaul ? [...TRAVEL_CHECKLIST, ...LONGHAUL_EXTRAS] : TRAVEL_CHECKLIST;
  const checkedCount = items.filter((it) => completed[`${destId}:check:${it.id}`]).length;

  return (
    <div className="space-y-2">
      <div className={`flex items-center justify-between`}>
        <div className={`text-[11px] uppercase tracking-[0.18em] font-medium ${C.textMuted}`}>
          Day-of checklist
        </div>
        <div className={`text-[11px] num ${C.textFaint}`}>
          {checkedCount}/{items.length}
        </div>
      </div>
      <div className="space-y-1">
        {items.map((it) => {
          const key = `${destId}:check:${it.id}`;
          const done = !!completed[key];
          return (
            <button
              key={key}
              onClick={() => toggleCompleted(key)}
              className={`w-full text-left flex items-start gap-3 px-3 py-2 rounded-lg ${C.hover} transition-colors`}
            >
              <span
                className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                  done ? `${C.accent} border-transparent text-white` : C.border
                }`}
              >
                {done && <Check className="w-3 h-3" />}
              </span>
              <span
                className={`text-sm leading-snug ${
                  done ? `${C.textFaint} line-through` : C.text
                }`}
              >
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Footer -----------------------------------------------------------

function Footer({ C }) {
  return (
    <footer className={`mt-10 pt-6 border-t ${C.borderSoft} text-xs ${C.textFaint} flex items-center justify-between`}>
      <div>Big Trip · {STOPS.length} stops · 56 days · two passports · one cruise</div>
      <div className="num">v1.1</div>
    </footer>
  );
}
