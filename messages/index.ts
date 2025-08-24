import basicFa from "./basic/fa"
import faPages from "./pages/fa"
import faEntities from "./entities/fa"
import faUseCases from "./useCases/fa"

export default {
    fa: {
        ...basicFa,
        pages: faPages,
        entities: faEntities,
        useCases: faUseCases,
    }
}