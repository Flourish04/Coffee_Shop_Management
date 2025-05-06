const { Pool } = require("pg");

//Local
/*
const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});
*/

// Online database
const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port,
  database: process.env.database,
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUGe2F4okYQJ758GFdn/DTLOcoE9IwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMTFiZThhMzEtYjBjYS00ZDdjLWFmYTgtOWU0NjMwNmFl
ZGI4IFByb2plY3QgQ0EwHhcNMjQxMDIwMTU0NzE5WhcNMzQxMDE4MTU0NzE5WjA6
MTgwNgYDVQQDDC8xMWJlOGEzMS1iMGNhLTRkN2MtYWZhOC05ZTQ2MzA2YWVkYjgg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJhQyD2s
Mh4B/UcjuSkYzh4gJ48xBDn77TXed2ptLlJCUFoW/mlwjmdUtA+PIaEyORL48AAx
aZy6smjZ4V/+4trXW+lARNGAzfY1whSnJl5DeciLWNarkmUmCdyAHKsN7O6r57uz
auJbgM0uZf34F6l6YwM6xBzsw8pkeKH64zTgOeQJ6gt+ow0Bzw0hpil2ypxt8FGX
yZmNBRwOp+fIW/4kAxDDqEB4WyQ1I7ROal3FwTr9psgzk2CrVoF64GsL5XIQEJUu
f34lBB7WK27b2D+3R79AANHjrnvmyt+k5gzzI79PxyH2BHfOs3Fu+UxeyrRZROe5
Am+Ajbb8Km+aIHUU0eysfZYlt1G2lKPIiXzB285R3rxG3hdzBcb1YwHASHZIZSeD
m4HQGyDfIDnCKVgqBJiU95wzsYgNEjmlg3wS2+nWt8+r1fyMne9Bpd+D5fd6fHEZ
y519sRoz/SU8+fpLUs5oG+tshBUn+foD1TNthOtQJWBMOaUfGBkyTRUt2QIDAQAB
oz8wPTAdBgNVHQ4EFgQUMsMSTDFtRyvRPbJ2vv0Qs2qLCdEwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHx9SBQMm34Qjhyc
O/3vDqTJThGs+mqARtqtoj3MD//riYUifbzxlP8knmfCSn1ZEpZI56nFCZWmVttR
xsbi+4EsGMEZA/Ljh+bWLyDW8+GrL6GEQ9QbMfpAyu39BtVzDH+vbyj7+OY/HZMh
FchA1qpCIv9S9xjRiPFpswMn5nJwLWWPREYoHEmUDOd7O/FwhXCv+KHzKTw86ExD
2N+8RyThf3QLUVKYl9XQeIedBTE/cQmuNDYp5jHcZWM+9COTN4OOlYtKKq9TBlMo
RrQq3NaEz2O3mbF5YdUF2ZgSzcQhTBtepGzVZLtqKreIli3gbTRiA9bfqnOjY7Be
u4c9y+PEts/SQ/XoFKmr78tHQGHq1RCloORBuue6PjfpOjj5gObNFRy56Ypiqfjt
yzUYTc74rcWhAd/DYUbo/Am/5WQgwlTLx5sadz79NDl4muqJ7WZ77gxJaLfFuCLl
BYpPk4y70sLDvLDlitkzQGXriEFaI+HjVG8+xAYU1BDemp9hjA==
-----END CERTIFICATE-----`,
  },
});

module.exports = pool;
