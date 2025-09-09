document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Load header
        const headerResponse = await fetch("header.html");
        const headerHTML = await headerResponse.text();
        document.getElementById("header-placeholder").innerHTML = headerHTML;

        // Load main
        try{
            const mainResponse = await fetch("main.html");
            const mainHTML = await mainResponse.text();
            document.getElementById("main-content").innerHTML = mainHTML;
        }
        catch (error) {
            const mainDetailResponse = await fetch("main-detail.html");
            const mainDetalHTML = await mainDetailResponse.text();
            document.getElementById("main-detail").innerHTML = mainDetalHTML;
        }

        // Load footer
        const footerResponse = await fetch("footer.html");
        const footerHTML = await footerResponse.text();
        document.getElementById("footer-placeholder").innerHTML = footerHTML;

        // Load recommend file
        try{
            const recommendResponse = await fetch("recommend.json");
            if (!recommendResponse.ok) throw new Error(`Failed to fetch recommend.json: ${recommendResponse.status}`);
            const recommendData = await recommendResponse.json();

            const recommendContainer = document.querySelector(".main__recommend-content");
            recommendData.forEach(item => {
                const anchor = document.createElement("a");
                anchor.className = "main__recommend-content-item";
                anchor.href = "ban-than-khac-gioi-cua-nam-chinh.html";

                const img = document.createElement("img");
                img.className = "main__recommend-content-img";
                img.src = item.image;
                img.alt = "image";

                const infoDiv = document.createElement("div");
                infoDiv.className = "main__recommend-content-info";

                const nameDiv = document.createElement("div");
                nameDiv.className = "main__recommend-content-name";
                nameDiv.textContent = item.name;

                const detailDiv = document.createElement("div");
                detailDiv.className = "main__recommend-content-detail";

                const chapterDiv = document.createElement("div");
                chapterDiv.className = "main__recommend-content-chapter";
                chapterDiv.textContent = item.chapter;

                const datepostDiv = document.createElement("div");
                datepostDiv.className = "main__recommend-content-datepost";
                datepostDiv.textContent = item.datepost;

                detailDiv.appendChild(chapterDiv);
                detailDiv.appendChild(datepostDiv);
                infoDiv.appendChild(nameDiv);
                infoDiv.appendChild(detailDiv);
                anchor.appendChild(img);
                anchor.appendChild(infoDiv);
                recommendContainer.appendChild(anchor);
            });
        }
        catch(error){}

        // Load product list
        try{
            const productResponse = await fetch("product.json");
            if (!productResponse.ok) throw new Error(`Failed to fetch product.json: ${productResponse.status}`);
            const productData = await productResponse.json();

            const productList = document.getElementById("product-list");
            productData.forEach(product => {
                const productHTML = `
                    <div class="col-sm-3 main__product">
                        <a class="main__item" href="ban-than-khac-gioi-cua-nam-chinh.html">
                            <img class="main__item-img" src="${product.image}" alt="image">
                            <div class="main__item-info">
                                <i class="fa fa-eye"></i>
                                <div class="main__item-info-viewer">${product.viewers}</div>
                                <i class="fa fa-comment"></i>
                                <div class="main__item-info-heart">${product.hearts}</div>
                                <i class="fa fa-heart"></i>
                            </div>
                        </a>
                        <div class="main__detail">
                            <div class="main__detail-name">${product.name}</div>
                            <div class="main__detail-previous">
                                ${product.chapters
                                    .map(
                                        chapter => `
                                            <div class="main__detail-previous-item">
                                                <a class="main__detail-previous-info" href="">${chapter.chapter}</a>
                                                <div class="main__detail-previous-datepost">${chapter.date}</div>
                                            </div>
                                        `
                                    )
                                    .join("")}
                            </div>
                        </div>
                    </div>
                `;
                productList.insertAdjacentHTML("beforeend", productHTML);
            });

            // Call the loadTopContent function
            await loadTopContent(); // Add this call
        }
        catch(error){}
        
    } catch (error) {
        console.error("Error loading content:", error);
    }

    async function loadTopContent() {
        try {
            // Fetch the JSON file
            const response = await fetch("top_product.json");
            if (!response.ok) {
                throw new Error(`Failed to fetch top_product.json: ${response.status}`);
            }

            // Parse the JSON
            const data = await response.json();
            console.log("Loaded top_product.json data:", data);

            // Get the container element
            const container = document.querySelector(".main__content-top-content");
            if (!container) {
                throw new Error("Container element with class 'main__content-top-content' not found.");
            }

            container.innerHTML = ""; // Clear existing content

            // Generate HTML for each item in the JSON
            data.forEach(item => {
                const itemHTML = `
                    <div class="main__content-top-content-top main__content-top-content-top-${item.index}">
                        <div class="main__content-top-content-index main__content-top-content-index-${item.index}">${item.index}</div>
                        <img class="main__content-top-content-img" src="${item.imgSrc}" alt="${item.name}">
                        <div class="main__content-top-content-info">
                            <div class="main__content-top-content-name">${item.name}</div>
                            <div class="main__content-top-content-des">
                                <div class="main__content-top-content-chapter">${item.chapter}</div>
                                <div class="main__content-top-content-viewer">
                                    <i class="fa fa-eye"></i> ${item.viewers}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML("beforeend", itemHTML);
            });
        } catch (error) {
            console.error("Error loading top content:", error);
        }
    }
});
