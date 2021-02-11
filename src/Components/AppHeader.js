import style from './Header.module.css'



export const AppHeader = ({userInfo})=> {
    return (
        <>
        <div className={style.headerWrapper}>
          Вы зашли под логином :{userInfo.user.username} C уровнем прав: {userInfo.authority.authority}
        </div>
        </>
    )
}