/**
 * 文件接口
 */
export interface IFile {

    /**
     * 文件id
     */
    id: string

    /**
     * 文件名称
     */
    name: string

    /**
     * 文件大小
     */
    size: string

    /**
     * 描述
     */
    descriptiond: string | undefined

    /**
     * 文件的服务器相对地址
     */
    url: string
}

/**
 * 文件接口实现
 */
export class FileEntity implements IFile {
    constructor() {
        this.id = ''
        this.name = ''
        this.size = ''
        this.url = ''
    }
    id: string
    name: string
    size: string
    descriptiond: string | undefined
    url: string

}