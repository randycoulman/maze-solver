# maze-solver

A maze solver. This is a practice project for me to start learning TypeScript.

## Background

The problem statement comes from the [Ruby Programming Challenge for Newbies
(RPCFN) #5](http://rubylearning.com/blog/2009/12/27/rpcfn-mazes---5/) by Peter
Cooper.

I've [solved this problem before in Ruby](https://github.com/roguerb/maze), but
thought it'd make a good problem to tackle again in TypeScript.

Below, I've reproduced the problem statement in case the link above goes stale.

## Introduction

Mazes are known to have challenged humans from as far back as the 5th century BC. There are many types of maze, but typically you need to find your way from a start point to an end point.

In this Ruby challenge, you will need to develop a class that can be used to solve mazes. Mazes will be provided as a string showing a graphical representation of the maze’s layout. Spaces are navigable, while # (pound) symbols are used to denote walls. In this challenge the letter “A” is used to mark the start point, and “B” the end point. Here’s an example of a maze contained within a string:

```ruby
MAZE1 = %{#####################################
# #   #     #A        #     #       #
# # # # # # ####### # ### # ####### #
# # #   # #         #     # #       #
# ##### # ################# # #######
#     # #       #   #     # #   #   #
##### ##### ### ### # ### # # # # # #
#   #     #   # #   #  B# # # #   # #
# # ##### ##### # # ### # # ####### #
# #     # #   # # #   # # # #       #
# ### ### # # # # ##### # # # ##### #
#   #       #   #       #     #     #
#####################################}
```

The prior maze would be loaded into a Maze object like so:

```ruby
Maze.new(MAZE1)
```

## The Challenge

There are two parts to the challenge: you can choose to do one or both, depending on your skill level or how much time you have available.

1. Implement a `Maze#solvable?` method that returns true/false depending on
   whether it’s possible to navigate the maze from point A to point B.

2. Implement a `Maze#steps` method that returns an integer of the least number
   of “steps” one would have to take within the maze to get from point A to
   point B. “Steps” can only be taken up, down, left or right. No diagonals.

There are a number of ways to “solve” mazes but there’s a wide scope for you to be as straightforward or as clever as you like with this challenge (tip: I’d love to see some clever/silly solutions!). Your “solvable?” and “steps” methods could share algorithms or you might come up with alternate ways to be more efficient in each case. Good luck!

**Note:** Use the test suite to ensure your code interfaces in the right way. The test suite demonstrates how your class will be called and used.

## The Test Suite

Your Maze class should be in `maze.rb` for the following test suite to work :-)

```ruby
require 'test/unit'
require 'maze'

MAZE1 = %{#####################################
# #   #     #A        #     #       #
# # # # # # ####### # ### # ####### #
# # #   # #         #     # #       #
# ##### # ################# # #######
#     # #       #   #     # #   #   #
##### ##### ### ### # ### # # # # # #
#   #     #   # #   #  B# # # #   # #
# # ##### ##### # # ### # # ####### #
# #     # #   # # #   # # # #       #
# ### ### # # # # ##### # # # ##### #
#   #       #   #       #     #     #
#####################################}
# Maze 1 should SUCCEED

MAZE2 = %{#####################################
# #       #             #     #     #
# ### ### # ########### ### # ##### #
# #   # #   #   #   #   #   #       #
# # ###A##### # # # # ### ###########
#   #   #     #   # # #   #         #
####### # ### ####### # ### ####### #
#       # #   #       # #       #   #
# ####### # # # ####### # ##### # # #
#       # # # #   #       #   # # # #
# ##### # # ##### ######### # ### # #
#     #   #                 #     #B#
#####################################}
# Maze 2 should SUCCEED

MAZE3 = %{#####################################
# #   #           #                 #
# ### # ####### # # # ############# #
#   #   #     # #   # #     #     # #
### ##### ### ####### # ##### ### # #
# #       # #  A  #   #       #   # #
# ######### ##### # ####### ### ### #
#               ###       # # # #   #
# ### ### ####### ####### # # # # ###
# # # #   #     #B#   #   # # #   # #
# # # ##### ### # # # # ### # ##### #
#   #         #     #   #           #
#####################################}
# Maze 3 should FAIL


class MazeTest < Test::Unit::TestCase
  def test_good_mazes
    assert_equal true, Maze.new(MAZE1).solvable?
    assert_equal true, Maze.new(MAZE2).solvable?
  end

  def test_bad_mazes
    assert_equal false, Maze.new(MAZE3).solvable?
  end

  def test_maze_steps
    assert_equal 44, Maze.new(MAZE1).steps
    assert_equal 75, Maze.new(MAZE2).steps
    assert_equal 0, Maze.new(MAZE3).steps
  end
end
```
