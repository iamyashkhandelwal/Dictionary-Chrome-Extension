console.log("script.js");

document.getElementById("form").addEventListener('submit', search);

function search(event){
	event.preventDefault();

	document.getElementById("main").innerHTML = '';


	const input = document.getElementById("input").value;

	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`, {
		method: "GET"
	})
	.then((response) => {
		response.json()
		.then((data) => {
			// console.log(data);

			// Proceed only if the word has a meaning in the dictionary
			if(data.title == 'No Definitions Found'){
				document.getElementById("main").innerHTML = 'Please check your spelling';

				document.getElementById("main").innerHTML = `<img class="not-found" src="./no-results.png" alt="Not found">`;
			}
			else{

				// console.log(data[0].word);
				// console.log(data[0].meanings);
				const containerDiv = document.createElement("div");
				containerDiv.classList.add("container");
				// containerDiv.setAttribute('id', "container");
				document.getElementById("main").appendChild(containerDiv);

				const word = document.createElement("h2");
				word.classList.add("word");
				// word.setAttribute('id', 'word');
				word.innerHTML = data[0].word;
				containerDiv.appendChild(word);

				const dataMap = data[0].meanings.map((elements, index) => {
					console.log(elements);
					console.log(elements.partOfSpeech);

					const posdiv = document.createElement("div");
					posdiv.setAttribute('id', `pos-${index}`);
					
					const h2 = document.createElement("h2");
					h2.classList.add("PART-OF-SPEECH");
					// h2.setAttribute('id', 'PART-OF-SPEECH');
					h2.innerHTML = elements.partOfSpeech;

					posdiv.appendChild(h2);
					containerDiv.appendChild(posdiv);

					const defMap = elements.definitions.map((ele, index) =>{
						// definition[] array
						console.log(ele);

						const defDiv = document.createElement("div");
						defDiv.setAttribute('id', `def-${index}`);

						const mean = document.createElement("h3");
						mean.classList.add("meaning");
						mean.innerHTML = `${index+1 + ". " +ele.definition}`;

						defDiv.appendChild(mean);
						posdiv.appendChild(defDiv);
						
						// Example
						if(ele.example){
							console.log(ele.example);

							const example = document.createElement("h4");
							example.classList.add("example");
							example.innerHTML = "Example: ";

							const span = document.createElement("span");
							span.innerHTML = ele.example;
							example.appendChild(span);
							defDiv.appendChild(example);
						}

						// Synonyms
						if(ele.synonyms.length){
							console.log(ele.synonyms);

							const synonyms = document.createElement("h4");
							synonyms.classList.add("synonyms")
							synonyms.innerHTML = "Synonyms: ";
							defDiv.appendChild(synonyms)

							let s = ele.synonyms.map((value) => {
								const span = document.createElement("span");
								span.classList.add("items");
								span.innerHTML = value;
								synonyms.appendChild(span);
							})
						}

						// Antonyms
						if(ele.antonyms.length){
							console.log(ele.antonyms);

							const antonyms = document.createElement("h4");
							antonyms.classList.add("antonyms");
							antonyms.innerHTML = "Antonyms: ";
							defDiv.appendChild(antonyms)

							let a = ele.antonyms.map((value) => {
								const span = document.createElement("span");
								span.classList.add("items");
								span.innerHTML = value;
								antonyms.appendChild(span);
							})
						}

					})


				});
				
				
			}
			

		})
	});

}
