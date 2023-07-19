import { returnColumn } from '../main.js';

export const handleSettings = (event, id) => {
    console.log(id)
    let modalHtml ="";
    const modalSetting = document.querySelector('.modalSetting');
    const button = event.target;
    const buttonCoord = button.getBoundingClientRect();


    modalHtml = `
        <div class="modalSetting-wrapper">
            <div class="modalSetting-up">
                <div class="modalSetting-up-wrapper">
                    <div class="modalSetting-description">Действия со списоком</div>
                    <div class="modalSetting-close">✖</div>
                </div>
            </div>
            <div class="modalSetting-share modalSetting-button" id="${id}">Поделиться</div>
            <div class="modalSetting-delete modalSetting-button" id="${id}">Удалить</div>
            <div class="modalSetting-addTask modalSetting-button" id="${id}">Добавить карточку</div>
        </div>
    ` 
    modalSetting.innerHTML = modalHtml

    modalSetting.style.top = buttonCoord.bottom + 'px';
    modalSetting.style.left = buttonCoord.left + 'px';
    modalSetting.style.display = "block";

}

export const handleSettingsClose = () => {
    const modalSetting = document.querySelector('.modalSetting');
    modalSetting.style.display = "none";
}


export const columnDelete = (columnId, columnList) => {
    console.log(columnId)
    const columnIndex = columnList.findIndex(column => column.id == columnId);
    console.log(columnIndex)

    columnList = columnList.splice(columnIndex,1);
    
    handleSettingsClose ()
    returnColumn()


}





