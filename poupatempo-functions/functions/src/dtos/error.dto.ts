import baseDto from "./base.dto";

class errorDto
    extends baseDto {
    constructor(
        public status: number,
        public code?: string,
        public message?: string,
        public error?: any,
        public stack?: string,
        public custom: boolean = true
    ) {
        super()
    }
}

export default errorDto;