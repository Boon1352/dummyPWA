function triggerButton(){
    console.log("Button Clicked!!!");

    if ('caches' in window){
        console.log("Cache");
    } else {
        console.log("Network");
    }
}