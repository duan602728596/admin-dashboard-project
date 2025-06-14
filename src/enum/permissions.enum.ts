/* 定义账号的权限 */
export const enum Permissions {
  Admin = 'Admin',  // 管理员用户可以访问所有页面
  Normal = 'Normal' // 普通用户只能访问有限页面
}