// Components/Blocks/FAQ.tsx
const FAQ = ({ block }) => {
	return (
	  <div>
		<h2>{block.title}</h2>
		<div dangerouslySetInnerHTML={{ __html: block.headline }}></div>
		{block.faqs.map((faq, index) => (
		  <div key={index}>
			<h3>{faq.title}</h3>
			<p>{faq.answer}</p>
		  </div>
		))}
	  </div>
	);
  };
  
  export default FAQ;