import { productWatchers } from "./product";
import { searchWatchers } from "./search";
import { storeWatchers } from "./store";

export default function* rootWatchers() {
    yield [productWatchers(), searchWatchers(), storeWatchers()]
}