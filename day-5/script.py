from collections import defaultdict, deque

# Fonction pour lire et analyser les données d'entrée
def parse_input(filename):
    with open(filename, "r") as file:
        lines = file.read().strip().split("\n")

    rules = []  # Liste des règles d'ordre (X|Y)
    updates = []  # Liste des mises à jour
    parsing_rules = True

    for line in lines:
        if line == "":
            parsing_rules = False  # Changement de section entre règles et mises à jour
            continue
        if parsing_rules:
            rules.append(tuple(map(int, line.split("|"))))  # Ajoute chaque règle
        else:
            updates.append(list(map(int, line.split(","))))  # Ajoute chaque mise à jour

    return rules, updates

# Vérifie si une mise à jour est correctement ordonnée selon les règles
def is_update_ordered(update, rules):
    # Crée un mapping pour obtenir l'indice d'une page dans la mise à jour
    page_index = {page: idx for idx, page in enumerate(update)}

    for x, y in rules:
        if x in page_index and y in page_index:
            if page_index[x] > page_index[y]:  # Si X est après Y, l'ordre est incorrect
                return False
    return True

# Trouve la page centrale d'une mise à jour
def find_middle_page(update):
    mid_idx = len(update) // 2
    return update[mid_idx]

# Corrige l'ordre des pages dans une mise à jour en utilisant les règles
def fix_update_order(update, rules):
    graph = defaultdict(list)  # Graphe pour les relations X -> Y
    in_degree = defaultdict(int)  # Dictionnaire pour les degrés entrants
    update_set = set(update)  # Ensemble des pages dans cette mise à jour

    # Construire le graphe des dépendances à partir des règles
    for x, y in rules:
        if x in update_set and y in update_set:
            graph[x].append(y)
            in_degree[y] += 1
            if x not in in_degree:
                in_degree[x] = 0

    # Tri topologique (algorithme de Kahn)
    queue = deque([node for node in update if in_degree[node] == 0])
    sorted_update = []

    while queue:
        node = queue.popleft()
        sorted_update.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return sorted_update

# Partie 1 : Calcule la somme des pages centrales des mises à jour correctes
def calculate_sum_of_middle_pages(rules, updates):
    correctly_ordered_updates = [
        update for update in updates if is_update_ordered(update, rules)
    ]
    return sum(find_middle_page(update) for update in correctly_ordered_updates)

# Partie 2 : Calcule la somme des pages centrales après correction des mises à jour incorrectes
def calculate_sum_of_middle_pages_part2(rules, updates):
    incorrectly_ordered_updates = [
        update for update in updates if not is_update_ordered(update, rules)
    ]
    fixed_updates = [fix_update_order(update, rules) for update in incorrectly_ordered_updates]
    return sum(find_middle_page(update) for update in fixed_updates)

# Fonction principale
def main():
    # Lecture et analyse des données
    rules, updates = parse_input("./day-5/input.txt")

    # Partie 1 : Somme des pages centrales des mises à jour correctes
    part1_result = calculate_sum_of_middle_pages(rules, updates)
    print(f"Part 1: Sum of middle pages of correctly ordered updates: {part1_result}")

    # Partie 2 : Somme des pages centrales des mises à jour corrigées
    part2_result = calculate_sum_of_middle_pages_part2(rules, updates)
    print(f"Part 2: Sum of middle pages of fixed updates: {part2_result}")

# Point d'entrée
if __name__ == "__main__":
    main()
