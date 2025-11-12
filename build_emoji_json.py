# build_emoji_json.py
# deps: none (stdlib only)
# usage: python3 build_emoji_json.py emoji-test.txt emoji.json

import sys, json, re

def codepoints_to_char(seq):
    # seq like "1F1FA 1F1F8" -> "🇺🇸"
    return "".join(chr(int(cp, 16)) for cp in seq.split())

def main(src, dst):
    group = None
    subgroup = None
    out = []

    # Lines look like:
    # # group: Smileys & Emotion
    # # subgroup: face-smiling
    # 1F600                                      ; fully-qualified     # 😀 E1.0 grinning face
    # 1F469 200D 1F4BB                            ; fully-qualified     # 👩‍💻 E12.1 woman technologist
    #
    # We’ll collect: emoji char, short name, group, subgroup.
    #
    re_group = re.compile(r"^#\s*group:\s*(.+)")
    re_sub   = re.compile(r"^#\s*subgroup:\s*(.+)")
    re_item  = re.compile(r"^([0-9A-F ]+)\s*;\s*\w+-qualified\s*#\s*(\S+)\s+E[0-9.]+\s+(.*)$")

    with open(src, "r", encoding="utf-8") as f:
        for line in f:
            line = line.rstrip("\n")
            m = re_group.match(line)
            if m:
                group = m.group(1).strip()
                continue
            m = re_sub.match(line)
            if m:
                subgroup = m.group(1).strip()
                continue
            m = re_item.match(line)
            if m and group and subgroup:
                cps, char, name = m.groups()
                # Normalize name a bit
                name = name.strip().lower()
                out.append({
                    "emoji": char,
                    "name": name,          # Unicode short name
                    "group": group,
                    "subgroup": subgroup
                })

    # Deduplicate (some sequences appear multiple times with variants)
    seen = set()
    deduped = []
    for e in out:
        key = (e["emoji"], e["name"])
        if key in seen: 
            continue
        seen.add(key)
        deduped.append(e)

    with open(dst, "w", encoding="utf-8") as f:
        json.dump(deduped, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(deduped)} emoji entries to {dst}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("usage: python3 build_emoji_json.py emoji-test.txt emoji.json")
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])
