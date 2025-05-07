# 📘 Chat Revision Log – Git and Version Control
**Date:** 2025-05-07  
**Scope:** Git usage, version control workflow, commit management  
**Chat Reference:** "Git space"  

---

## 📝 Summary

This chat is dedicated to Git-related discussions, fixes, and practices. In this session:
- We clarified how to revert the last commit using different methods.
- We established that this chat will store Git-focused knowledge.
---

## ✅ Key Revisions / Takeaways

- [x] **Revert last Git commit options:**
  - `git reset --soft HEAD~1` → undo commit but keep changes.
  - `git reset --hard HEAD~1` → undo commit and discard changes.
  - `git revert HEAD` → safely revert commit with a new commit.
- [x] **Clarified Git reset vs revert usage, especially for pushed commits.**

---

## 💡 Notes & Decisions

- Use `git revert` for public/shared branches to avoid rewriting history.
- Use `reset` for local-only changes when you want a clean slate.
---

## 🔗 Resources / Commands / Links

```bash
git reset --soft HEAD~1   # Undo commit, keep changes
git reset --hard HEAD~1   # Undo commit and changes
git revert HEAD           # Safe revert with new commit
