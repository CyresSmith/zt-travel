export const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const emailRegexp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

// export const phoneRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const phoneRegexp = /^(50|63|66|67|68|73|91|92|93|94|95|96|97|98|99)\d{7}$/i;

export const ukRegex = /[А-Яа-яЁёЇїІіЄєҐґ]/;

export const enRegex = /[A-Za-z]/;
