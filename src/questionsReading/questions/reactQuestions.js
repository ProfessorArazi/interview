const reactQuestions = `What is React?
2	What are the major features of React?
3	What is JSX?
4	What is the difference between Element and Component?
5	How to create components in React?
6	When to use a Class Component over a Function Component?
7	What are Pure Components?
8	What is state in React?
9	What are props in React?
10	What is the difference between state and props?
11	Why should we not update the state directly?
12	What is the purpose of callback function as an argument of setState()?
13	What is the difference between HTML and React event handling?
14	How to bind methods or event handlers in JSX callbacks?
15	How to pass a parameter to an event handler or callback?
16	What are synthetic events in React?
17	What are inline conditional expressions?
18	What is "key" prop and what is the benefit of using it in arrays of elements?
19	What is the use of refs?
20	How to create refs?
21	What are forward refs?
22	Which is preferred option with in callback refs and find dom Node()?
23	Why are String Refs legacy?
24	What is Virtual dom?
25	How Virtual dom works?
26	What is the difference between Shadow dom and Virtual dom?
27	What is React Fiber?
28	What is the main goal of React Fiber?
29	What are controlled components?
30	What are uncontrolled components?
31	What is the difference between createElement and cloneElement?
32	What is Lifting State Up in React?
33	What are the different phases of component lifecycle?
34	What are the lifecycle methods of React?
35	What are Higher-Order components?
36	How to create props proxy for HOC component?
37	What is context?
38	What is children prop?
39	How to write comments in React?
40	What is the purpose of using super constructor with props argument?
41	What is reconciliation?
42	How to set state with a dynamic key name?
43	What would be the common mistake of function being called every time the component renders?
44	Is lazy function supports named exports?
45	Why React uses className over class attribute?
46	What are fragments?
47	Why fragments are better than container divs?
48	What are portals in React?
49	What are stateless components?
50	What are stateful components?
51	How to apply validation on props in React?
52	What are the advantages of React?
53	What are the limitations of React?
54	What are error boundaries in React v16
55	How error boundaries handled in React v15?
56	What are the recommended ways for static type checking?
57	What is the use of react-dom package?
58	What is the purpose of render method of react-dom?
59	What is React DOM Server?
60	How to use InnerHtml in React?
61	How to use styles in React?
62	How events are different in React?
63	What will happen if you use setState in constructor?
64	What is the impact of indexes as keys?
65	Is it good to use setState() in componentWillMount() method?
66	What will happen if you use props in initial state?
67	How do you conditionally render components?
68	Why we need to be careful when spreading props on dom elements??
69	How you use decorators in React?
70	How do you memoize a component?
71	How you implement Server-Side Rendering or SSR?
72	How to enable production mode in React?
73	What is CRA and its benefits?
74	What is the lifecycle methods order in mounting?
75	What are the lifecycle methods going to be deprecated in React v16?
76	What is the purpose of getDerivedStateFromProps() lifecycle method?
77	What is the purpose of getSnapshotBeforeUpdate() lifecycle method?
78	Do Hooks replace render props and higher order components?
79	What is the recommended way for naming components?
80	What is the recommended ordering of methods in component class?
81	What is a switching component?
82	Why we need to pass a function to setState()?
83	What is strict mode in React?
84	What are React Mixins?
85	Why is isMounted() an anti-pattern and what is the proper solution?
86	What are the Pointer Events supported in React?
87	Why should component names start with capital letter?
88	Are custom dom attributes supported in React v16?
89	What is the difference between constructor and getInitialState?
90	Can you force a component to re-render without calling setState?
91	What is the difference between super() and super(props) in React using ES6 classes?
92	How to loop inside JSX?
93	How do you access props in attribute quotes?
94	What is React PropType array with shape?
95	How to conditionally apply class attributes?
96	What is the difference between React and React dom?
97	Why React dom is separated from React?
98	How to use React label element?
99	How to combine multiple inline style objects?
100	How to re-render the view when the browser is resized?
101	What is the difference between setState and replaceState methods?
102	How to listen to state changes?
103	What is the recommended approach of removing an array element in react state?
104	Is it possible to use React without rendering HTML?
105	How to pretty print JSON with React?
106	Why you can't update props in React?
107	How to focus an input element on page load?
108	What are the possible ways of updating objects in state?
110	How can we find the version of React at runtime in the browser?
111	What are the approaches to include polyfills in your create-react-app?
112	How to use https instead of http in create-react-app?
113	How to avoid using relative path imports in create-react-app?
114	How to add Google Analytics for react-router?
115	How to update a component every second?
116	How do you apply vendor prefixes to inline styles in React?
117	How to import and export components using react and ES6?
118	What are the exceptions on React component naming?
119	Why is a component constructor called only once?
120	How to define constants in React?
121	How to programmatically trigger click event in React?
122	Is it possible to use async/await in plain React?
123	What are the common folder structures for React?
124	What are the popular packages for animation?
125	What is the benefit of styles modules?
126	What are the popular React-specific linters?
127	How to make AJAX call and In which component lifecycle methods should I make an AJAX call?
128	What are render props?
React Router
129	What is React Router?
130	How React Router is different from history library?
131	What are the <Router> components of React Router v4?
132	What is the purpose of push and replace methods of history?
133	How do you programmatically navigate using React router v4?
134	How to get query parameters in React Router v4
135	Why you get "Router may have only one child element" warning?
136	How to pass params to history.push method in React Router v4?
137	How to implement default or NotFound page?
138	How to get history on React Router v4?
139	How to perform automatic redirect after login?
React Internationalization
140	What is React-Intl?
141	What are the main features of React Intl?
142	What are the two ways of formatting in React Intl?
143	How to use FormattedMessage as placeholder using React Intl?
144	How to access current locale with React Intl
145	How to format date using React Intl?
React Testing
146	What is Shallow Renderer in React testing?
147	What is TestRenderer package in React?
148	What is the purpose of ReactTestUtils package?
149	What is Jest?
150	What are the advantages of Jest over Jasmine?
206	What are the main features of reselect library?
207	Give an example of reselect usage?
209	Does the statics object work with ES6 classes in React?
210	Can Redux only be used with React?
211	Do you need to have a particular build tool to use Redux?
212	How Redux Form initialValues get updated from state?
213	How React PropTypes allow different type for one prop?
214	Can I import an SVG file as react component?
215	Why are inline ref callbacks or functions not recommended?
216	What is render hijacking in React?
217	What are HOC factory implementations?
218	How to pass numbers to React component?
219	Do I need to keep all my state into Redux? Should I ever use react internal state?
220	What is the purpose of registerServiceWorker in React?
221	What is React memo function?
222	What is React lazy function?
223	How to prevent unnecessary updates using setState?
224	How do you render Array, Strings and Numbers in React 16?
225	How to use class field declarations syntax in React classes?
226	What are hooks?
227	What rules need to be followed for hooks?
228	How to ensure hooks followed the rules in your project?
229	What are the differences between Flux and Redux?
230	What are the benefits of React Router V4?
231	Can you describe about componentDidCatch lifecycle method signature?
232	In which scenarios error boundaries do not catch errors?
233	Why do you not need error boundaries for event handlers?
234	What is the difference between try catch block and error boundaries?
235	What is the behavior of uncaught errors in react 16?
236	What is the proper placement for error boundaries?
237	What is the benefit of component stack trace from error boundary?
238	What is the required method to be defined for a class component?
239	What are the possible return types of render method?
240	What is the main purpose of constructor?
241	Is it mandatory to define constructor for React component?
242	What are default props?
243	Why should not call setState in componentWillUnmount?
244	What is the purpose of getDerivedStateFromError?
245	What is the methods order when component re-rendered?
246	What are the methods invoked during error handling?
247	What is the purpose of displayName class property?
248	What is the browser support for react applications?
249	What is the purpose of unmountComponentAtNode method?
250	What is code-splitting?
251	What is the benefit of strict mode?
252	What are Keyed Fragments?
253	Does React support all HTML attributes?
254	What are the limitations with HOCs?
255	How to debug forwardRefs in DevTools?
256	When component props defaults to true?
257	What is NextJS and major features of it?
258	How do you pass an event handler to a component?
259	Is it good to use arrow functions in render methods?
260	How to prevent a function from being called multiple times?
261	How JSX prevents Injection Attacks?
262	How do you update rendered elements?
263	How do you say that props are read only?
264	How do you say that state updates are merged?
265	How do you pass arguments to an event handler?
266	How to prevent component from rendering?
267	What are the conditions to safely use the index as a key?
268	Is it keys should be globally unique?
269	What is the popular choice for form handling?
270	What are the advantages of formik over redux form library?
271	Why do you not required to use inheritance?
272	Can I use web components in react application?
273	What is dynamic import?
274	What are loadable components?
275	What is suspense component?
276	What is route based code splitting?
277	Give an example on How to use context?
278	What is the purpose of default value in context?
279	How do you use contextType?
280	What is a consumer?
281	How do you solve performance corner cases while using context?
282	What is the purpose of forward ref in HOCs?
283	Is it ref argument available for all functions or class components?
284	Why do you need additional care for component libraries while using forward refs?
285	How to create react class components without ES6?
286	Is it possible to use react without JSX?
287	What is diffing algorithm?
288	What are the rules covered by diffing algorithm?
289	When do you need to use refs?
290	Is it prop must be named as render for render props?
291	What are the problems of using render props with pure components?
292	How do you create HOC using render props?
293	What is windowing technique?
294	How do you print falsy values in JSX?
295	What is the typical use case of portals?
296	How do you set default value for uncontrolled component?
297	What is your favorite React stack?
298	What is the difference between Real dom and Virtual dom?
299	How to add Bootstrap to a react application?
300	Can you list down top websites or applications using react as front end framework?
301	Is it recommended to use CSS In JS technique in React?
302	Do I need to rewrite all my class components with hooks?
303	How to fetch data with React Hooks?
304	Is Hooks cover all use cases for classes?
305	What is the stable release for hooks support?
306	Why do we use array destructuring (square brackets notation) in useState?
307	What are the sources used for introducing hooks?
308	How do you access imperative API of web components?
309	What is formik?
310	What are typical middleware choices for handling asynchronous calls in Redux?
311	Do browsers understand JSX code?
312	Describe about data flow in react?
313	What is react scripts?
314	What are the features of create react app?
315	What is the purpose of renderToNodeStream method?
316	What is MobX?
317	What are the differences between Redux and MobX?
318	Should I learn ES6 before learning ReactJS?
319	What is Concurrent Rendering?
320	What is the difference between async mode and concurrent mode?
321	Can I use javascript urls in react16.9?
322	What is the purpose of eslint plugin for hooks?
323	What is the difference between Imperative and Declarative in React?
324	What are the benefits of using typescript with reactjs?
325	How do you make sure that user remains authenticated on page refresh while using Context API State Management?
326	What are the benefits of new JSX transform?
327	How does new JSX transform different from old transform?
328	How do you get redux scaffolding using create-react-app?
329	What are React Server components?
330	What is prop drilling?
331	What is state mutation and how to prevent it?
332	What is the difference between useState and useRef hook?
`;

module.exports = reactQuestions;
