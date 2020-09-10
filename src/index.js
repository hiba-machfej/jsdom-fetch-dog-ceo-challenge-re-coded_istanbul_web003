console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault
    fetchImages()
    fetchBreed()
    // changeColor()
})
function fetchImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            const imageContainer = document.getElementById('dog-image-container');
            const imgsUrl = data.message;
            imgsUrl.forEach(link => {
                const image = document.createElement('IMG');
                image.src = link;
                imageContainer.appendChild(image)
            })
        })
}
function fetchBreed() {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then((res) => res.json())
        .then((json) => {
            const breedContainer = document.getElementById('dog-breeds');
            const breedUrls = json.message;
            const arrayOfBreed = [];
            // console.log(arrayOfBreed)
            for (const url in breedUrls) {
                arrayOfBreed.push(url);
            }
            arrayOfBreed.map(x => {
                const breedUrl = document.createElement('li');
                breedUrl.innerText = x;
                breedContainer.appendChild(breedUrl);
            })
            const select = document.querySelector('ul');
            //console.log(select)
            select.style.cursor = 'pointer';
            select.addEventListener('click', function (event) {
                event.target.style.color = "hotpink";
            })
            function selectBreedByLetter() {
                breedContainer.innerHTML = ``;
                const selectOption = document.getElementById("breed-dropdown");
                const letterA = arrayOfBreed.filter(breed => breed[0][0] === selectOption.value)
                letterA.map(x => {
                    const aList = document.createElement('li');
                    aList.innerText = x;
                    breedContainer.appendChild(aList);
                })
                selectOption.addEventListener('change', (event) => {
                    breedContainer.innerHTML = ``;
                    let filterLetter = arrayOfBreed.filter(breed => breed[0][0] === event.target.value)
                    filterLetter.map(x => {
                        let chooseBreedList = document.createElement('li');
                        chooseBreedList.innerText = x;
                        breedContainer.appendChild(chooseBreedList);
                    })
                })
            }
            selectBreedByLetter()
        })
}