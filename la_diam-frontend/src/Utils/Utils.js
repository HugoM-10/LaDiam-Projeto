export function getImageDjango(inputString) {

    if (typeof inputString !== 'string') {
        return "http://127.0.0.1:8000//media/default.png";
    }
    return "http://127.0.0.1:8000/"+inputString;
}