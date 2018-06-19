const Roles = [
    {
        value: 'admin',
        label: 'Admin',
    },
    {
        value: 'manager',
        label: 'Manager',
    },
    {
        value: 'associate',
        label: 'Associate',
    }
];

const RolePermissions = {
    "SuperAdmin": ["SuperAdmin", "Admin", "Manager", "Associate", "Guest"],
    "Admin": ["Manager", "Associate"],
    "Manager": ["Associate"],
    "Associate": [],
}

export {Roles, RolePermissions};