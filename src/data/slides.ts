import type { SlideData } from "../types";
import { videoPath } from "./videos";

const background = (id: number, ext = "jpg") =>
  `backgrounds/slide_${String(id).padStart(2, "0")}_background.${ext}`;

export const slides: SlideData[] = [
  {
    id: 1,
    section: "CLEAN ENERGY • SUSTAINABLE FUTURE",
    title: ["SOLAR PANEL"],
    subtitle: "Solar Energy in Vietnam",
    backgroundImage: background(1),
    backgroundVideo: videoPath(1),
    accent: "cyan",
    layout: "cover",
  },
  {
    id: 2,
    section: "INTRODUCTION",
    title: ["GROUP MEMBERS"],
    members: [
      { name: "LÊ QUỲNH NHI" },
      { name: "NGUYỄN NGỌC THANH TRÂM" },
      { name: "LÊ GIA BẢO" },
      { name: "PHẠM NGỌC TRỌNG" },
      { name: "LÊ ĐĂNG KHƯƠNG" },
      { name: "VŨ NGỌC HÙNG CƯỜNG" },
    ],
    backgroundImage: background(2, "png"),
    backgroundVideo: videoPath(2),
    accent: "cyan",
    layout: "members",
  },
  {
    id: 3,
    section: "DEFINITION",
    title: ["What Is Solar Energy?"],
    lead: [
      "Solar energy is obtained from solar",
      "radiation emitted by the Sun.",
    ],
    bullets: [
      { icon: "sun", text: "Renewable, clean, and virtually inexhaustible." },
      { icon: "zap", text: "Converted into electrical or thermal energy." },
      {
        icon: "home",
        text: ["Used in residential, commercial, and", "industrial applications."],
      },
      {
        icon: "leaf",
        text: [
          "A key sustainable solution as fossil fuels",
          "decline and climate change intensifies.",
        ],
      },
    ],
    takeaway: {
      title: "RENEWABLE & INEXHAUSTIBLE",
      body: ["Sunlight provides clean power and heat", "for many uses."],
    },
    backgroundImage: background(3),
    backgroundVideo: videoPath(3),
    accent: "cyan",
    layout: "standard",
  },
  {
    id: 4,
    section: "OPERATING PRINCIPLE",
    title: ["The Photovoltaic Effect"],
    lead: [
      "Photovoltaic cells transform photon",
      "energy into direct-current electricity.",
    ],
    bullets: [
      { icon: "sun", text: ["Sunlight carries energy in the form of", "photons."] },
      { icon: "battery", text: "PV cells absorb photon energy." },
      {
        icon: "zap",
        text: ["The absorbed energy releases an electrical", "current."],
      },
      { icon: "plug", text: "Power is produced without burning fuel." },
    ],
    takeaway: {
      title: "PHOTONS BECOME POWER",
      body: ["PV cells generate electricity without", "burning fuel."],
    },
    backgroundImage: background(4),
    backgroundVideo: videoPath(4),
    accent: "cyan",
    layout: "standard",
  },
  {
    id: 5,
    section: "OPERATING PRINCIPLE",
    title: ["From Sunlight to Usable", "Power"],
    lead: [
      "Solar radiation → PV panels → DC power →",
      "inverter → AC power",
    ],
    bullets: [
      {
        icon: "home",
        text: ["AC electricity powers appliances or enters the", "national grid."],
      },
      {
        icon: "plug",
        text: ["The inverter makes solar electricity", "compatible with everyday loads."],
      },
      {
        icon: "battery",
        text: ["Excess power can be stored for nighttime or", "low-irradiance periods."],
      },
    ],
    takeaway: {
      title: "DC TO USABLE AC",
      body: ["The inverter makes solar output ready for", "homes and the grid."],
    },
    backgroundImage: background(5),
    backgroundVideo: videoPath(5),
    accent: "cyan",
    layout: "standard",
  },
  {
    id: 6,
    section: "SOLAR POTENTIAL IN VIETNAM",
    title: ["Vietnam Has Abundant", "Solar Resources"],
    stats: [
      { value: "1,600–2,700", label: "sunshine hours / year" },
      { value: "4.5–5.0", label: "kWh/m²/day" },
    ],
    bullets: [
      {
        icon: "map",
        text: [
          "A tropical monsoon climate and",
          "near-equatorial location create strong",
          "potential.",
        ],
      },
      {
        icon: "compass",
        text: ["Solar-resource levels vary clearly from North", "to South."],
      },
    ],
    takeaway: {
      title: "STRONG NATIONAL POTENTIAL",
      body: ["Vietnam receives 1,600-2,700 sunshine", "hours each year."],
    },
    backgroundImage: background(6),
    backgroundVideo: videoPath(6),
    accent: "cyan",
    layout: "stats",
  },
  {
    id: 7,
    section: "SOLAR POTENTIAL IN VIETNAM",
    title: ["The South Has Very High", "Potential"],
    stats: [
      { value: "2,000–2,600", label: "sunshine hours / year" },
      { value: "4.8–5.5", label: "kWh/m²/day" },
    ],
    bullets: [
      {
        icon: "sun",
        text: ["Year-round sunlight and a prolonged dry", "season."],
      },
      {
        icon: "map",
        text: ["Key hubs: Ninh Thuan, Binh Thuan, Tay Ninh,", "Gia Lai, and Dak Lak."],
      },
    ],
    takeaway: {
      title: "THE SOUTH LEADS SOLAR",
      body: ["Up to 2,600 sunshine hours support very", "high output."],
    },
    backgroundImage: background(7),
    backgroundVideo: videoPath(7),
    accent: "cyan",
    layout: "stats",
  },
  {
    id: 8,
    section: "SOLAR POTENTIAL IN VIETNAM",
    title: ["The North Still Supports", "Rooftop Solar"],
    stats: [
      { value: "1,500–1,700", label: "sunshine hours / year" },
      { value: "3.8–4.1", label: "kWh/m²/day" },
    ],
    bullets: [
      {
        icon: "cloud",
        text: ["Cold winters, fog, and persistent drizzle", "reduce output."],
      },
      {
        icon: "home",
        text: ["Rooftop systems remain practical for homes", "and industrial facilities."],
      },
    ],
    takeaway: {
      title: "ROOFTOP SOLAR STILL WORKS",
      body: ["Northern weather reduces output, not", "long-term viability."],
    },
    backgroundImage: background(8),
    backgroundVideo: videoPath(8),
    accent: "cyan",
    layout: "stats",
  },
  {
    id: 9,
    section: "SOLAR POTENTIAL IN VIETNAM",
    title: ["Three Application Models"],
    bullets: [
      {
        icon: "land",
        title: "Ground-mounted farms",
        text: ["Use arid land and sand dunes with low", "agricultural potential."],
      },
      {
        icon: "home",
        title: "Rooftop solar",
        text: ["Serves homes, factories, and major urban", "centers close to demand."],
      },
      {
        icon: "waves",
        title: "Floating solar",
        text: ["Saves land and benefits from the cooling effect", "of water."],
      },
    ],
    takeaway: {
      title: "THREE SCALABLE MODELS",
      body: ["Ground, rooftop, and floating systems fit", "different needs."],
    },
    backgroundImage: background(9),
    backgroundVideo: videoPath(9),
    accent: "cyan",
    layout: "cards",
  },
  {
    id: 10,
    section: "CURRENT DEVELOPMENT STATUS",
    title: ["Vietnam’s Solar Market", "Grew Rapidly"],
    timeline: [
      { icon: "spark", period: "2010–2015", text: "Small, fragmented projects" },
      {
        icon: "trending",
        period: "2016–2019",
        text: ["FIT policies triggered an", "investment boom"],
      },
      {
        icon: "battery",
        period: "2020–2026",
        text: ["Rooftop PV, diverse policies,", "and energy storage"],
      },
    ],
    lead: [
      "Installed capacity was estimated at over 18 GWp",
      "by the end of 2024.",
    ],
    takeaway: {
      title: "18+ GWp BY 2024",
      body: ["Supportive policy triggered rapid market", "growth."],
    },
    backgroundImage: background(10),
    backgroundVideo: videoPath(10),
    accent: "orange",
    layout: "timeline",
  },
  {
    id: 11,
    section: "CURRENT DEVELOPMENT STATUS",
    title: ["Solar Supply Peaks", "Before Demand"],
    bullets: [
      { icon: "sun", text: "Solar output peaks around 11:00 AM–2:00 PM." },
      {
        icon: "clock",
        text: ["National demand peaks later, around 5:00", "PM–9:00 PM."],
      },
      {
        icon: "alert",
        text: ["This timing gap creates localized capacity", "surplus."],
      },
      {
        icon: "cable",
        text: ["220 kV / 500 kV grid upgrades have not kept", "pace."],
      },
      {
        icon: "map",
        text: ["Central and Central Highlands projects may", "face curtailment."],
      },
    ],
    takeaway: {
      title: "PEAK-TIME MISMATCH",
      body: ["Solar production peaks hours before", "national demand."],
    },
    backgroundImage: background(11),
    backgroundVideo: videoPath(11),
    accent: "orange",
    layout: "standard",
  },
  {
    id: 12,
    section: "CURRENT DEVELOPMENT STATUS",
    title: ["Financial and Legal", "Barriers Slow Projects"],
    bullets: [
      {
        icon: "wallet",
        title: "Transitional pricing",
        text: "Lower temporary prices strain debt repayment.",
      },
      {
        icon: "file",
        title: "Regulatory audits",
        text: ["Land, construction, and fire-safety compliance", "are under review."],
      },
      {
        icon: "trending",
        title: "Investment impact",
        text: ["Uncertainty restricts M&A and access to new", "capital."],
      },
    ],
    takeaway: {
      title: "POLICY UNCERTAINTY",
      body: ["Pricing and legal reviews continue to slow", "investment."],
    },
    backgroundImage: background(12),
    backgroundVideo: videoPath(12),
    accent: "orange",
    layout: "cards",
  },
  {
    id: 13,
    section: "CURRENT DEVELOPMENT STATUS",
    title: ["C&I Self-Consumption Is", "Expanding"],
    lead: [
      "Factories increasingly use rooftop PV to",
      "control costs and meet export",
      "requirements.",
    ],
    bullets: [
      {
        icon: "factory",
        text: "On-site solar reduces operational electricity costs.",
      },
      {
        icon: "file",
        text: ["I-RECs support ESG and EU/US market", "requirements."],
      },
      { icon: "battery", text: "High battery costs limit surplus-power storage." },
      { icon: "shield", text: "Zero-export devices may be required." },
    ],
    takeaway: {
      title: "SELF-CONSUMPTION RISING",
      body: ["Factories cut costs while meeting export", "and ESG goals."],
    },
    backgroundImage: background(13),
    backgroundVideo: videoPath(13),
    accent: "orange",
    layout: "standard",
  },
  {
    id: 14,
    section: "CURRENT DEVELOPMENT STATUS",
    title: ["New Rules Open the", "Market"],
    lead: [
      "DPPA and Decree 135 create legal",
      "pathways for direct purchases and",
      "self-consumption.",
    ],
    bullets: [
      {
        icon: "file",
        text: ["Grid-connection registration remains", "complex."],
      },
      { icon: "gauge", text: "Surplus electricity feed-in is capped at 20%." },
      {
        icon: "shield",
        text: ["Roof-load approval and fire-safety clearance", "can delay projects."],
      },
    ],
    takeaway: {
      title: "MARKET ACCESS EXPANDS",
      body: ["New rules enable direct purchases and", "self-consumption."],
    },
    backgroundImage: background(14),
    backgroundVideo: videoPath(14),
    accent: "orange",
    layout: "standard",
  },
  {
    id: 15,
    section: "ADVANTAGES",
    title: ["Solar Energy Protects the", "Environment"],
    bullets: [
      { icon: "sun", text: "Sunlight is renewable and abundant." },
      { icon: "zap", text: "PV generation requires no fuel combustion." },
      {
        icon: "leaf",
        text: ["Operational greenhouse-gas emissions are", "very low."],
      },
      {
        icon: "cloud",
        text: ["Avoids SO₂, NOₓ, and fine particulate", "pollution."],
      },
      { icon: "waves", text: "Uses minimal water during operation." },
    ],
    takeaway: {
      title: "CLEAN POWER NO COMBUSTION",
      body: "Low emissions - Minimal water use",
    },
    backgroundImage: background(15),
    backgroundVideo: videoPath(15),
    accent: "green",
    layout: "standard",
  },
  {
    id: 16,
    section: "ADVANTAGES",
    title: ["Solar Delivers Long-Term", "Value"],
    bullets: [
      { icon: "wallet", text: "Reduces monthly electricity bills." },
      {
        icon: "sun",
        text: ["Savings are strongest during peak daytime", "hours."],
      },
      {
        icon: "settings",
        text: ["No moving mechanical parts means low", "maintenance."],
      },
      { icon: "clock", text: "Panels typically last 20–30 years." },
      { icon: "home", text: "Rooftop systems can increase property value." },
    ],
    takeaway: {
      title: "20-30 YEARS OF VALUE",
      body: ["Lower bills and low maintenance", "compound over time."],
    },
    backgroundImage: background(16),
    backgroundVideo: videoPath(16),
    accent: "green",
    layout: "standard",
  },
  {
    id: 17,
    section: "ADVANTAGES",
    title: ["Distributed Solar", "Strengthens Communities"],
    bullets: [
      {
        icon: "network",
        title: "Lower grid pressure",
        text: "Local generation reduces transmission stress.",
      },
      {
        icon: "map",
        title: "Remote-area access",
        text: ["Off-grid systems serve islands and mountain", "regions."],
      },
      {
        icon: "users",
        title: "Better quality of life",
        text: ["Reliable local power supports homes and", "services."],
      },
    ],
    takeaway: {
      title: "POWER CLOSER TO PEOPLE",
      body: ["Distributed solar strengthens remote", "communities."],
    },
    backgroundImage: background(17),
    backgroundVideo: videoPath(17),
    accent: "green",
    layout: "cards",
  },
  {
    id: 18,
    section: "CHALLENGES",
    title: ["Solar Output Changes", "with the Weather"],
    bullets: [
      { icon: "sun", text: "Panels generate only during daylight." },
      {
        icon: "cloud",
        text: ["Rain, clouds, and fog can sharply reduce", "output."],
      },
      {
        icon: "activity",
        text: ["Fast weather changes create continuous", "fluctuations."],
      },
      {
        icon: "alert",
        text: ["Intermittency increases grid-balancing", "pressure."],
      },
    ],
    takeaway: {
      title: "WEATHER DRIVES OUTPUT",
      body: ["Intermittency increases grid-balancing", "pressure."],
    },
    backgroundImage: background(18),
    backgroundVideo: videoPath(18),
    accent: "red",
    layout: "standard",
  },
  {
    id: 19,
    section: "CHALLENGES",
    title: ["Cost and Grid Capacity", "Remain Barriers"],
    bullets: [
      {
        icon: "wallet",
        text: ["Turnkey systems still require substantial", "upfront investment."],
      },
      {
        icon: "settings",
        text: ["Costs include panels, inverters, mounting", "structures, wiring, and labor."],
      },
      {
        icon: "battery",
        text: ["Battery storage remains expensive and", "typically lasts only 5-10 years."],
      },
      {
        icon: "network",
        text: ["Rapid regional expansion can overload", "transmission infrastructure."],
      },
      {
        icon: "alert",
        text: ["Grid congestion may force operators to curtail", "solar generation."],
      },
    ],
    takeaway: {
      title: "COST + GRID CAPACITY",
      body: ["The two biggest barriers to solar", "expansion."],
    },
    backgroundImage: background(19),
    backgroundVideo: videoPath(19),
    accent: "red",
    layout: "standard",
  },
  {
    id: 20,
    section: "CHALLENGES",
    title: ["End-of-Life Panels Need a", "Circular Solution"],
    bullets: [
      {
        icon: "recycle",
        title: "Panel waste",
        text: ["Retired panels need organized collection and", "recycling."],
      },
      {
        icon: "alert",
        title: "Heavy-metal risk",
        text: "Some technologies require careful treatment.",
      },
      {
        icon: "land",
        title: "Land footprint",
        text: ["Large farms can conflict with agriculture or", "forests."],
      },
    ],
    takeaway: {
      title: "BUILD A CIRCULAR SYSTEM",
      body: ["Collection and recycling must scale with", "deployment."],
    },
    backgroundImage: background(20),
    backgroundVideo: videoPath(20),
    accent: "red",
    layout: "cards",
  },
  {
    id: 21,
    section: "SUSTAINABLE SOLUTIONS",
    title: ["Planning Must Match Grid", "Capacity"],
    bullets: [
      {
        icon: "network",
        text: ["Coordinate solar projects with electricity-grid", "capacity."],
      },
      {
        icon: "compass",
        text: ["Create transparent, predictable development", "plans."],
      },
      { icon: "shield", text: "Maintain stable support policies." },
      {
        icon: "file",
        text: ["Simplify investment and connection", "procedures."],
      },
      {
        icon: "trending",
        text: ["Give enterprises confidence to invest long", "term."],
      },
    ],
    takeaway: {
      title: "PLAN WITH THE GRID",
      body: ["Solar growth must follow available", "transmission capacity."],
    },
    backgroundImage: background(21),
    backgroundVideo: videoPath(21),
    accent: "cyan",
    layout: "standard",
  },
  {
    id: 22,
    section: "SUSTAINABLE SOLUTIONS",
    title: ["Upgrade the Grid and", "Expand Rooftop Solar"],
    bullets: [
      {
        icon: "cable",
        title: "Transmission upgrades",
        text: "Expand substations and high-voltage lines.",
      },
      {
        icon: "battery",
        title: "Smart grids and storage",
        text: "Improve stability and operational reliability.",
      },
      {
        icon: "home",
        title: "Rooftop incentives",
        text: ["Offer finance, preferential loans, and technical", "advice."],
      },
    ],
    takeaway: {
      title: "MODERNIZE THE NETWORK",
      body: ["Grid upgrades, storage, and rooftop", "incentives work together."],
    },
    backgroundImage: background(22),
    backgroundVideo: videoPath(22),
    accent: "cyan",
    layout: "cards",
  },
  {
    id: 23,
    section: "SUSTAINABLE SOLUTIONS",
    title: ["People and Skills", "Complete the Transition"],
    bullets: [
      {
        icon: "users",
        title: "Community awareness",
        text: "Explain the economic and environmental benefits.",
      },
      {
        icon: "users",
        title: "Public participation",
        text: "Encourage wider sustainable-energy adoption.",
      },
      {
        icon: "graduation",
        title: "Technical workforce",
        text: "Train installers, operators, and maintenance staff.",
      },
      {
        icon: "settings",
        title: "Predictive maintenance",
        text: "Improve efficiency and extend system life.",
      },
    ],
    takeaway: {
      title: "PEOPLE COMPLETE THE SHIFT",
      body: ["Skills and public participation sustain the", "transition."],
    },
    backgroundImage: background(23),
    backgroundVideo: videoPath(23),
    accent: "cyan",
    layout: "cards",
  },
  {
    id: 24,
    section: "CONCLUSION",
    title: ["Solar Can Power Vietnam’s", "Sustainable Future"],
    lead: [
      "Vietnam has the natural resources and",
      "market experience to make solar a pillar",
      "of long-term energy security.",
    ],
    bullets: [
      {
        icon: "check",
        text: ["Utility-scale and rooftop projects have", "diversified the energy mix."],
      },
      {
        icon: "alert",
        text: ["Grid limits, investment costs, and storage", "remain the main barriers."],
      },
      {
        icon: "spark",
        text: [
          "Effective policy, better technology, and broad",
          "cooperation can unlock the next stage of",
          "growth.",
        ],
      },
    ],
    takeaway: {
      title: "VIETNAM'S SOLAR FUTURE",
      body: ["Policy, technology, and cooperation", "unlock the next stage."],
    },
    backgroundImage: background(24),
    backgroundVideo: videoPath(24),
    accent: "cyan",
    layout: "standard",
  },
];

if (slides.length !== 24) {
  throw new Error(`Expected 24 slides, found ${slides.length}.`);
}
