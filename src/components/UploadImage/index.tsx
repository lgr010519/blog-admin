import React, {useEffect, useState} from "react";
import Item from "@/components/UploadImage/item";

const UploadImage = (props) => {
    const {value, onChange, max, showImg = true, showLink = true, showIcon = false, showAction = true} = props

    interface Image {
        _id?: string
        imgUrl?: string
        link?: string
        icon?: string
        showAdd?: boolean
        showReduce?: boolean
    }

    const initImgs: Array<Image> = [
        {
            _id: '',
            imgUrl: '',
            link: '',
            icon: '',
        }
    ]

    const [imgsArr, setImgsArr] = useState(() => {
        return value ? value : initImgs
    })

    useEffect(() => {
        if (!value) {
            setImgsArr(initImgs)
        } else {
            if (Array.isArray(value)) {
                const length = value.length
                value.map((item, idx) => {
                    if (length < max) {
                        item.showReduce = length !== 1
                        item.showAdd = length === idx + 1
                    } else {
                        item.showReduce = true
                        item.showAdd = false
                    }
                })
            }
            setImgsArr(value)
        }
    }, [value])

    const onItemChange = (data) => {
        imgsArr.forEach((item, index) => {
            if (data.index === index) {
                item[data.field] = data.value
            }
        })
        onChange(imgsArr)
    }

    const onAdd = () => {
        if (imgsArr.length < max) {
            imgsArr.push({
                imgUrl: '',
                link: '',
                icon: '',
            })
            onChange(imgsArr)
        }
    }

    const onRemove = (index) => {
        if (imgsArr.length > 1) {
            imgsArr.splice(index, 1)
            onChange(imgsArr)
        }
    }

    return (
        <>
            {
                Array.isArray(imgsArr) ?
                    imgsArr?.map((item, index) => {
                        return <Item
                            key={index}
                            {...item}
                            index={index}
                            onChange={onItemChange}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            showImg={showImg}
                            showLink={showLink}
                            showIcon={showIcon}
                            showAction={showAction}
                        />
                    }) :
                    <Item
                        {...imgsArr}
                        onChange={onItemChange}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        showImg={showImg}
                        showLink={showLink}
                        showIcon={showIcon}
                        showAction={showAction}
                    />
            }
        </>
    )
}

export default UploadImage