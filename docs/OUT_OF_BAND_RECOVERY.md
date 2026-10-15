# EIROS MCP — обязательный аварийный маршрут вне VPS

Когда `EBRIDGE` и `Ebridge VPS Ops` одновременно не отвечают, **не зависай на повторных вызовах и не перезагружай VPS вслепую**.

1. Проверь с независимого внешнего сервиса `https://vault.178-105-43-79.sslip.io/v2/health`. Если ответ `{"ok":true,"isolated":true}`, сервер и VAULT API отвечают; неисправность управления отделена от полного падения VPS.
2. Используй **уже доступный GitHub MCP** для альтернативной диагностики: `mcp__GitHub__create_issue({repository_full_name:"ricobiz/eiros-control-plane",title:"[EIROS-OOB] status",body:"Read-only diagnostic. No reboot."})`. Результат прочитай инструментом `mcp__GitHub__fetch_issue_comments` с номером созданной задачи.
3. Потребуется один раз настроить секрет `HCLOUD_TOKEN` в GitHub Actions repo `ricobiz/eiros-control-plane`. Без него обращение к Hetzner невозможно. Тест от 16.10.2026: задача [#7](https://github.com/ricobiz/eiros-control-plane/issues/7) успешно запустила GitHub-hosted Actions, но вернула `GitHub Actions secret HCLOUD_TOKEN is missing`.
4. Подтверждённый владельцем **мягкий перезапуск** через GitHub MCP: создать issue c точным названием `[EIROS-OOB] graceful_reboot`, телом `CONFIRM_GRACEFUL_REBOOT_ebridge_178.105.43.79`. Если публичный health жив, требуется отдельное решение пользователя добавить `OVERRIDE_HEALTHY=true`. Никакого reboot без явного запроса.
5. **Жёсткий reset** — только через ручной GitHub Actions `EIROS Hetzner Out-of-Band Recovery`, со вторым подтверждением. Не триггерится MCP-issue.
6. После восстановления доступа выясни фактическую причину отказа по `journalctl`, OOM, TLS/tunnel/transport, systemd, status Hetzner. Не заявляй, что причина известна, до проверки логов.

Вся реализация, защита действий, документация и точные команды: [eiros-control-plane/docs/MCP_OOB_RECOVERY.md](https://github.com/ricobiz/eiros-control-plane/blob/main/docs/MCP_OOB_RECOVERY.md).

Это независимый **GitHub MCP → GitHub Actions → Hetzner API** мост, а не отдельный зарегистрированный `Hetzner MCP` плагин. Provider token пока не настроен. Не смешивай эти два факта.
