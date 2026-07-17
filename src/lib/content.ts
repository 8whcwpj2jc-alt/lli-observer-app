// Rewritten (grammar/clarity pass) from the Love-Lead Institute framework spreadsheet and
// Observer Considerations doc. Meaning that affects scoring/behavior is preserved exactly;
// wording has been tightened and cleaned up. See plans/ for the source extraction notes.

export const APP_NAME = "Love – Lead";
export const APP_TAGLINE = "Leadership Development Institute for Emerging Leaders";

// App-mechanics reference, not sourced from the original framework — explains the software
// itself (navigation, the wizard, auto-save) rather than the leadership content.
export const HOW_IT_WORKS: { heading: string; body: string }[] = [
  {
    heading: "Your Dashboard",
    body: `This is home base — it's what you land on after logging in. It shows your top 3 focus areas (your highest combined Rating × Desire scores across everything you've rated so far), a progress tile for each tier, a summary of your observers, and your most recent activity.`,
  },
  {
    heading: "Working through a tier",
    body: `Each of Tiers 1-4 walks you through one skill or attribute at a time — you'll rate it, note your desire to grow it, write your own definition, and answer three thought questions. Use the Previous/Next buttons to move in order, or click any numbered circle above the form to jump straight to a specific skill. The checkmark at the end of the row is the Experiment step, where you turn what you found into a concrete strategy and action for that tier.`,
  },
  {
    heading: "Moving to the next tier",
    body: `Tiers build on each other, so a tier only unlocks once every skill in the one before it has a rating, desire, definition, and all three thought questions answered — plus at least one experiment. A locked tier shows a 🔒 in the menu; if you visit one before it's ready, the page tells you exactly what's still missing and links you back to finish it.`,
  },
  {
    heading: "My Leadership Approach (Tier 5)",
    body: `This opens once Tiers 1-4 are fully complete. It's a running journal rather than a form — write your leadership approach as you understand it today, and each new entry is saved below the last so you can watch it evolve over time.`,
  },
  {
    heading: "Observers",
    body: `Add the people you want real-world feedback from. Each observer gets their own private link — no login required — plus you'll get a ready-to-copy invite email to send them. Whatever feedback they share shows up back on your Observers page, tied to whichever skill they mentioned.`,
  },
  {
    heading: "Everything saves automatically",
    body: `There's no submit button on most fields — just type your answer or pick a rating, and it saves on its own as soon as you click away or make a selection. If you navigate away and come back, everything you entered will still be there.`,
  },
];

export const BACKGROUND_RATIONALE: { heading: string; body: string[] }[] = [
  {
    heading: "What does love have to do with it?",
    body: [
      `Leadership has evolved through every major societal shift — the Industrial Revolution, the Depression, the World Wars, the Sexual Revolution, the Great Recession, Black Lives Matter, the COVID-19 pandemic. Through all of it, leadership has remained fundamentally about human interaction. Now more than ever, leaders need to operate from a place of genuine care for the people around them.`,
      `To be clear: this isn't romantic love. It's a general care for others and a real desire to help them succeed. That care is a sacred trust — it must never be used to manipulate, coerce, or blur into inappropriate relationships. Held properly, it brings out the best in people and unlocks change, innovation, and results that are hard to reach any other way.`,
    ],
  },
  {
    heading: "Why emerging leaders?",
    body: [
      `Organizations often promote people into leadership because they excelled as individual performers — not because they'd already developed leadership skills. Without intentional development, many emerging leaders won't succeed, regardless of how much potential they showed. This program exists to give any emerging leader a clear path: identify the skills and attributes that matter most, build a development plan and take action, and define a leadership approach rooted in genuine care for others — one that will guide them for the rest of their career.`,
      `Leaders can "emerge" more than once, in different roles, teams, and seasons of life. Committing to continuous development means you should expect to keep emerging — which makes it worth asking, honestly: when, how, and why am I emerging as a leader right now?`,
    ],
  },
  {
    heading: "Training or development?",
    body: [
      `Training teaches leadership theory and practice, usually in a classroom or remote setting: you listen, participate, try things out afterward, then come back and debrief. That's valuable, but it has a built-in gap — by the time you report back on what happened, time and distance have already reshaped how you remember and describe it. Add group dynamics and social pressure, and what gets reported often isn't quite what actually happened. None of this is dishonesty; it's just how memory and retelling work. But it limits how much you can actually learn from the moment.`,
      `Development is different: it's the ongoing process of growth, built for real time rather than after the fact.`,
    ],
  },
  {
    heading: "This program's approach",
    body: [
      `Love-Lead leadership development is a serious investment — typically up to six months, with one to three days a week combining shadowing, coaching, mentoring, and real-time debriefing. It isn't a classroom or a discussion group. You work side-by-side with a leadership development coach who observes you in your actual workspace and coaches you close enough to the moment that there's no time to reframe what happened. That immediacy is what makes it effective: you face your thoughts, emotions, and actions as they happen, learn from them, and apply what you've learned right away.`,
      `This is paired with the intensive self-evaluation process you're using now — one that turns your reflection into concrete strategies and action plans, so you keep closing the gap between the leadership you want and how you actually show up.`,
      `One thing makes this approach different from most leadership programs: you define your own skills and attributes, rate their importance for yourself, decide your own level of desire to grow in each one, and reflect deeply — all with real-time coaching alongside you. Most programs simply tell you what to work on. This one is built on the idea that you're best positioned to know what you need, especially with good feedback along the way.`,
    ],
  },
];

export const PARTICIPANT_GUIDELINES: string[] = [
  `You're about to move through five tiers, each building on the one before it, culminating in your own defined leadership approach. What you create is a living document — expect to revisit and revise it throughout your life and career. It's only as useful as the honesty and effort you bring to it: where you're already strong, own it; where you want to grow, name it plainly.`,
  `The most important concept in this tool is framing. Framing means the meaning you choose to give a situation — and the frame we're asking you to hold throughout is one of growth and opportunity, not evaluation. Wherever you are in your leadership journey, ask yourself: what opportunity exists here for growth? This is not a test, and it's not material for a performance review — it's a chance to understand your own leadership and build a real plan to close the gap between where you are and where you want to be.`,
  `As you rate and reflect on each skill or attribute, capture your thoughts and questions as they come up — you'll want them for conversations with the observers you choose to walk this journey with you.`,
];

export const RATING_QUESTION = "This is already a strength of mine as a leader.";
export const RATING_SCALE_LEGEND: { value: number; label: string }[] = [
  { value: 1, label: "Strongly agree" },
  { value: 2, label: "Agree" },
  { value: 3, label: "Not sure" },
  { value: 4, label: "Disagree" },
  { value: 5, label: "Strongly disagree" },
];

export const DESIRE_QUESTION = "I want to grow in this skill or attribute.";
export const DESIRE_SCALE_HINT = "1 = low desire to grow this · 5 = high desire to grow this";

export const SCORING_EXPLANATION = `Your score for each skill is Rating × Desire. A high score (for example, strongly disagreeing you're already strong here, times a high desire to grow) means there's both a real gap and real motivation — that combination is usually worth focusing on first. A lower score doesn't mean ignore it, just that the opportunity or desire may be smaller right now. The score is a signal, not a verdict — where you put your energy is always your call.`;

export const THOUGHT_QUESTIONS: string[] = [
  "If this skill or attribute matters more to you than others, what values sit underneath that judgment?",
  "What impact would developing this skill or attribute have on the people around you?",
  "What would need to change in your personal or professional life for you to more fully develop this skill or attribute?",
];

export const DEFINITION_EXAMPLE = `e.g. "To me, being intentional means making conscious choices about how I show up, rather than reacting on autopilot."`;

export const THOUGHT_QUESTION_EXAMPLES: string[] = [
  `e.g. "I value honesty and accountability — this matters to me because it reflects those values in how I lead."`,
  `e.g. "If I grow here, the people around me would likely feel more heard and trust me more when I give feedback."`,
  `e.g. "I'd need to slow down before reacting in tense moments and ask more questions before sharing my own opinion."`,
];

export const TIER_INSTRUCTIONS_INTRO = `Hold this frame in mind: what opportunity exists for growth here? For each skill or attribute, you'll rate it, note your level of desire to grow in it, define it in your own words, and answer three thought questions. When you're done with all of them, use the Experiment step at the end to turn what you've found into a concrete strategy and action.`;

export const TIER_META: Record<
  1 | 2 | 3 | 4,
  { title: string; context: string }
> = {
  1: {
    title: "Character & Foundations",
    context: `Your character, tendencies, and behaviors are the foundation of who you are — and of how you lead. This tier is about building that foundation intentionally. Developing these skills and attributes isn't a checklist to complete once; it's ongoing work. The only real choice is whether it happens by accident or on purpose. Use this section to begin — or continue — shaping these foundational qualities with intention.`,
  },
  2: {
    title: "Working With & Through Others",
    context: `Where Tier 1 focused on your character, Tier 2 turns outward — to the skills you use working with and through other people: collaborating, listening, empowering, and encouraging. These are ongoing practices, not one-time lessons. Use this section to intentionally build the interpersonal skills that make you effective alongside others.`,
  },
  3: {
    title: "Getting Things Done",
    context: `This tier is about the "how" — the core management skills every leader needs in their toolbox: running projects, managing people and processes, and executing well. Few leaders, especially emerging ones, can avoid this work for long, so it's worth deliberately building strength here.`,
  },
  4: {
    title: "Vision & Big-Picture Leadership",
    context: `Tier 4 is about vision — learning to see and communicate the bigger picture while staying grounded in the management skills from Tier 3. Growing as a leader means holding both: a clear view of where things could go, and the consistency to help make it real.`,
  },
};

export const TIER5_CONTEXT = `Everything in this program builds toward one thing: defining your own approach to leadership. This is your chance to put it into words — a concise statement of how you lead, one you can share so others understand how you operate.`;

export const TIER5_INSTRUCTIONS = `Frame: What kind of leader do I want to be? With that in mind, write your leadership approach as you understand it today, drawing on everything you've learned through the tiers, your reflections, and what you've read. It's fine to start over more than once — this is a living document, not a final answer. Once it starts taking shape, the real work is consistently living it out. Bring questions to your practitioner or observers as they come up.`;

export const RESOURCES: { year: string; title: string; author: string }[] = [
  { year: "1958", title: "Leadership", author: "Sterling W. Sill" },
  { year: "1960", title: "Leadership - Volume II", author: "Sterling W. Sill" },
  { year: "1982", title: "Reasoning, Learning and Action - Individual and Organizational", author: "Chris Argyris" },
  { year: "1989", title: "The Seven Habits of Highly Effective People", author: "Stephen R. Covey" },
  { year: "1990", title: "Competing Against Time - How Time Based Competition is Reshaping Global Markets", author: "George Stalk Jr. and Thomas M. Hout" },
  { year: "1992", title: "The Goal - A Process of Ongoing Improvement (2nd Rev. Ed.)", author: "Eliyahu M. Goldratt and Jeff Cox" },
  { year: "1993", title: "Reengineering the Corporation - A Manifesto for Business Revolution", author: "Michael Hammer and James Champy" },
  { year: "1995", title: "The E-Myth Revisited - Why Most Small Businesses Don't Work and What To Do About It", author: "Michael E. Gerber" },
  { year: "2001", title: "Good to Great - Why Some Companies Make the Leap and Others Don't", author: "Jim Collins" },
  { year: "2002", title: "Execution - The Discipline of Getting Things Done", author: "Larry Bossidy and Ram Charan" },
  { year: "2002", title: "Critical Thinking, Reading and Writing - A Brief Guide To Argument (4th Ed.)", author: "Sylvan Barnat and Hugo Bedau" },
  { year: "2002", title: "The Five Dysfunctions of a Team: A Leadership Fable", author: "Patrick Lencioni" },
  { year: "2004", title: "Visible Thinking - Unlocking Causal Mapping for Practical Business Results", author: "John M. Bryson, Fran Ackermann, Colin Eden, Charles B. Finn" },
  { year: "2004", title: "Leadership Presence - Dramatic Techniques to Reach Out, Motivate and Inspire", author: "Belle Linda Halpern and Kathy Lubar" },
  { year: "2005", title: "Leadership for the Common Good - Tackling Public Problems in a Shared Power World (2nd Ed.)", author: "Barbara C. Crosby and John M. Bryson" },
  { year: "2005", title: "Blink - The Power of Thinking Without Thinking", author: "Malcolm Gladwell" },
  { year: "2007", title: "StrengthsFinder 2.0", author: "Tom Rath" },
  { year: "2007", title: "The Leadership Challenge (4th Ed.)", author: "James M. Kouzes and Barry Z. Posner" },
  { year: "2010", title: "Getting Naked - A Business Fable About Shedding the Three Fears that Sabotage Client Loyalty", author: "Patrick Lencioni" },
  { year: "2010", title: "The Fifth Discipline - The Art and Practice of The Learning Organization", author: "Peter M. Senge" },
  { year: "2011", title: "Traction - Get a Grip on Your Business (Expanded Ed.)", author: "Gino Wickman" },
  { year: "2012", title: "Start Something that Matters", author: "Blake Mycoskie" },
  { year: "2013", title: "Humble Inquiry - The Gentle Art of Asking Instead of Telling", author: "Edgar M. Schein" },
  { year: "2014", title: "The Power of Habit - Why We Do What We Do In Life and Business", author: "Charles Duhigg" },
  { year: "2014", title: "The Six Sigma Way - How to Maximize the Impact of Your Change and Improvement Efforts (2nd Ed.)", author: "Peter S. Pande, Robert P. Neuman, and Roland R. Cavanaugh" },
  { year: "2015", title: "Getting Things Done - The Art of Stress-Free Productivity", author: "David Allen" },
  { year: "2016", title: "Smarter, Faster, Better - The Secrets of Being Productive in Life and Business", author: "Charles Duhigg" },
  { year: "2017", title: "The Five Second Rule - Transform your Life, Work, and Confidence with Everyday Courage", author: "Mel Robbins" },
  { year: "2017", title: "Extreme Ownership - How U.S. Navy SEALs Lead and Win", author: "Jocko Willink and Leif Babin" },
  { year: "2018", title: "Alive at Work - The Neuroscience of Helping Your People Love What They Do", author: "Daniel M. Cable" },
  { year: "2018", title: "The Dichotomy of Leadership", author: "Jocko Willink and Leif Babin" },
  { year: "2018", title: "Atomic Habits - An Easy & Proven Way to Build Good Habits & Break Bad Ones", author: "James Clear" },
  { year: "2018", title: "The Speed of Trust - The One Thing That Changes Everything", author: "Stephen M.R. Covey with Rebecca R. Merrill" },
  { year: "2018", title: "Leadership Presence (HBR Emotional Intelligence Series)", author: "Various Authors" },
];

// Observer selection criteria + commitment language kept verbatim from
// "2021 0202 Observer Considerations.docx" — see /selection-guide.
export const OBSERVER_SELECTION_CONSIDERATIONS: string[] = [
  "They should be competent — able to design their own actions and achieve desired outcomes.",
  "They should be self-confident, seeing themselves as effective actors in whatever environment they're in.",
  "They should be committed to you making your own choices on this journey.",
  "They must be trustworthy.",
  "When providing feedback, they need to give you valid information based on actual data — not opinion or conjecture.",
  "Timeliness is critical.",
  "They can't all be family, allies, or friends — look for observers who will challenge you.",
  "Both followers and leaders can be good observers.",
  "Observers must be able to interact with you in day-to-day situations, whether professional or personal.",
  "They must commit to participating with you for the entire journey, unless circumstances make that impossible.",
];

export const PARTICIPANT_COMMITMENT = `I commit to you to fully engage with you on my journey of change and growth. I will not be defensive about feedback you provide and have open dialogue whenever necessary. I will both give and receive valid information, meaning it is based on actual data/experiences not conjecture, opinion, etc. I am committed to this journey in its entirety, and will make free, open, and informed choices about what character traits and skills I will work to add/change in my personal and professional life. I will develop experiments and actions during the course of this journey and I will need your help and input to develop the most effective ones possible.`;

export const OBSERVER_COMMITMENT = `I commit to fully engage with you on your journey of change and growth. I will give and receive valid information based on actual data/experiences as much as possible and not conjecture, opinion, etc. I will not be defensive about feedback and will have open dialogue with you whenever necessary. I will do whatever possible to allow you to make fully informed and free choices during your journey. I will assist you in the development of experiments and actions to help you change and grow. I commit to your journey in its entirety as related to time, unless circumstances beyond my control do not allow me to continue or we mutually agree my time as an observer on your journey is complete.`;

// Admin-only reference content — light cleanup only, not a full rewrite pass.
export const PRACTITIONER_GUIDE_CLIENT: { heading: string; body: string }[] = [
  {
    heading: "Introductory meeting",
    body: "Hold an introductory meeting with the individual or organization. Cover the approach, how it works, what to expect from participants, how you'll work with them as a client, the tools and resources, and access to facility/people as needed.",
  },
  {
    heading: "Strategy meeting",
    body: "Once a prospect has signed on as a client, hold a strategy meeting to establish purpose, align the approach and tools with their culture, and identify specific participant info and needs. Update the participant's report afterward to reflect any additional focus attributes.",
  },
  {
    heading: "Agreement",
    body: "Complete the SOW and agreement template for the client to execute.",
  },
  {
    heading: "Collaboration",
    body: "This is a significant investment of the client's time, resources, and access to their organization's internal workings. Keep regular meetings with client leadership so they stay informed on progress, and never share content either you or the participant have agreed is confidential.",
  },
  {
    heading: "Completion",
    body: "The content is broken into five tiers, and participants shouldn't work ahead — each tier builds on the last, and trying to do them all at once is overwhelming. Completion is somewhat open-ended: it's ultimately a shared decision, weighted in this order — the participant and where they are in their development, the client's input on progress and cost, and lastly the practitioner.",
  },
];

export const PRACTITIONER_GUIDE_PARTICIPANT: { heading: string; body: string }[] = [
  {
    heading: "Hold an introductory meeting with the participant",
    body: "Hold this offsite. The goal is mutual: they're evaluating you too, and you're determining if they're ready to begin and finish a journey like this. This is a subjective call on your part — never be hesitant to walk away. The person matters more than the business, and so does your own capacity to help them succeed.",
  },
  {
    heading: "Establish trust",
    body: "Make clear this isn't a performance review, that confidential content won't be shared with the client, that you'll always give clear and honest feedback, and that you'll be shadowing them across all aspects of their work. Let them know they shouldn't try to adjust their behavior for your benefit — over time, who they really are will come through anyway.",
  },
  {
    heading: "Start ~3 days/week of on-site shadowing",
    body: "Plan on 3-4 weeks to see the participant's true behavior. Resist the urge to coach during this period — just document what you observe. This is also when the participant begins Tier 1 of their own report, and you begin yours based on your observations.",
  },
  {
    heading: "Start face-to-face meetings",
    body: "Dialogue about the participant's work in their report, ask good questions, listen actively, and start giving real-time feedback and coaching. Be caring and considerate, but clear and concise — that combination builds trust and helps the participant most.",
  },
  {
    heading: "Select focus skills/attributes",
    body: "With 52 possible skills and attributes, no one can focus on them all. Critically, the practitioner does not choose which ones the participant focuses on — the participant chooses, informed by their own definitions, ratings, desire levels, thought-question answers, and your feedback as practitioner. Your role is to offer honest, clear input in 1:1 meetings, especially where the participant may not see a gap they have.",
  },
  {
    heading: "Ongoing",
    body: "Keep attending work with them, mentoring and coaching in real time on the skills selected. This takes time and patience — renew your own energy as needed, since a worn-out coach doesn't help the participant.",
  },
  {
    heading: "Completion",
    body: "The content is broken into four tiers/phases; encourage participants not to work ahead. Completion is somewhat open-ended and is ultimately a shared decision, weighted in this order — the participant and where they are in their development, the client's input on progress and cost, and lastly the practitioner.",
  },
];

export function buildObserverInviteEmail(observerName: string, participantName: string, link: string) {
  return `Dear ${observerName},

I am reaching out to invite you to join my team of observers during my journey of change and growth on the Observer app. Please know this is a deeply meaningful and powerful journey, and this request comes to you as an expression of my respect for you and our relationship.

What am I asking you to do for me?

To observe me in our normal day-to-day interactions and provide feedback based on valid information — not conjecture or opinion — using the Observer app. To have open dialogue with me whenever necessary, and help me develop experiments and actions to more fully realize specific character traits and skills I choose to pursue in my personal and professional life.

Click here to go to Observer and confirm you'll be an observer, review and commit to the Observer Commitment, and then let's connect to discuss next steps:
${link}

Thank you so much for being willing to help me — I look forward to taking this journey with you.

Sincerely,
${participantName}`;
}
