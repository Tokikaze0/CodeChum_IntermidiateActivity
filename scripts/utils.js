export function showLoader(isLoading) {
    const loader = document.getElementById("loader");
    loader.setAttribute("aria-hidden", !isLoading);
    loader.style.display = isLoading ? "block" : "none";
}

export function handleError(message) {
    alert(`Error: ${message}`);
}
